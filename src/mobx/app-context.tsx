import { AppService, AppStates } from '@src/services/app/types';
import { observable, action } from 'mobx';

import { ActivityIndicatorController, InteractionServiceImpl } from '@src/services/interaction/impl';
import * as T from '@src/services/app/types';
import { FetchService, SuccessCheck } from '@src/web-api/impl-whatwg-fetch';
import * as M from '@src/model';
import { PerfTracer } from '@src/util';
import { IRef } from '@src/util/mutref';
import { loadNativeBridge } from '@src/util/native-modules';
import { buildDefaultStorageStateFromNative } from '@src/services/storage/util';
import { PersistentStorageService } from '@src/services/storage/impl';
import { asyncStorageBackend } from '@src/services/storage-backend/impl';
import CodePush, { LocalPackage } from 'react-native-code-push';
import { BlockingAnimationOptions, InteractionState } from '@src/services/interaction/types';

import * as Store from '@src/store';

const perf = PerfTracer.enterAsync;

export {
  AppService,
  AppStates
};

interface DefaultAppServiceImplInit {
  activity: ActivityIndicatorController;
  lifecycle: T.AppLifecycleProvider;
  initProps: InitProps;
}

interface InitProps {
  sessionId: string;
  routeName: string;
  successCheck: SuccessCheck<any>;
  userRole?: string;
  userId?: string;
}

export class AppContext {
  @observable app: AppService;
  @observable states: AppStates;

  @action
  async loadService(env: M.Env, init: DefaultAppServiceImplInit): Promise<void> {
    this.app = new AppService();
    this.app.env = env;
    const storageState = await perf('app.init.loadStorageNative',
      () => buildDefaultStorageStateFromNative(loadNativeBridge()));
    this.app.storage = await perf('app.init.loadAsyncStorage',
      () => PersistentStorageService.load(asyncStorageBackend(), storageState));
    this.app.interaction = new InteractionServiceImpl(init.activity);

    this.app.webService = new FetchService(10000, init.initProps.successCheck, init.initProps.sessionId);
    this.app.userRole = init.initProps.userRole ? init.initProps.userRole : '';
    this.app.userId = init.initProps.userId ? init.initProps.userId : '';
    this.app.routeName = init.initProps.routeName;

    this.app.versionLabel = '';
    try {
      CodePush.getUpdateMetadata().then((pkg: LocalPackage) => {
        console.log('========== getUpdateMetadata =======' + JSON.stringify(pkg));
        if (pkg && pkg.label) {
          // Since it might not exist for dev builds..
          this.app.versionLabel = pkg.label;
        }
      });
    } catch (e) {
      console.log('========= catch app init getUpdateMetadata() ======== exception:' + JSON.stringify(e));
    }

    this.app.localizedStrings = M.Language.choose(this.app.storage.language.value, T.strings);
  }

  @action
  async loadAppState(): Promise<void> {
    const storageRef = new Store.misc.StorageStateRef(this.app.storage);
    this.states = {
      interaction: {
        blockingAnimationStack: [],
      },
      storage: storageRef.value,
    };
    storageRef.attachListener(async (state: T.StorageState) => {
      this.states.storage = state;
      console.warn('======== attachListener ====== ' + JSON.stringify(this.states.storage));
    });
  }

  get localStrings(): T.LocalizedStrings {
    this.app.localizedStrings = M.Language.choose(this.app.storage.language.value, T.strings);
    return this.app.localizedStrings;
  }

  @action
  async addBlockingAnimation(opts: BlockingAnimationOptions): Promise<void> {
    this.states.interaction.blockingAnimationStack.push(opts);
  }

  @action
  async removeBlockingAnimation(): Promise<void> {
    this.states.interaction.blockingAnimationStack.pop();
  }

  @action
  async changedStoreLang(lang: M.Language.Type): Promise<void> {
    await this.app.storage.language.setValue(lang);
  }

  @action
  async updateSessionToken(newSessionId: string) {
    this.app.webService.updateSessionToken(newSessionId);
  }

}

const appContext = new AppContext();
export default appContext; 