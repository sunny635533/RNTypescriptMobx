import * as React from 'react';
import {
  StyleSheet,
  Text,
  AppState,
  Platform,
  PushNotificationIOS,
  SafeAreaView,
  DeviceEventEmitter,
  EmitterSubscription
} from 'react-native';
import { autobind } from 'core-decorators';
import {
  copyWith,
  PerfTracer,
  absurd,
  isIphoneX,
  ListenerId,
  withRetry,
  delay
} from '@src/util';
import { BlockingAnimationOptions, InteractionState } from '@src/services/interaction/types';
import { ActivityIndicatorController } from '@src/services/interaction/impl';
import * as Store from '@src/store';
import * as EnvConfig from '@src/model/env-config';
import { FullscreenLoadingView, BlockerOverlayLoading } from '@src/ui/load';
import { AppNavigator, routeNavigate } from '@src/ui/nav/container';
import { ThemeRed } from '@src/ui/colors';
import { presentExceptionAsAlert, renderSomeException } from '@src/util/user-facing-errors';
import { strings } from '@src/main/strings';
import { FilteredAppLifecycle } from '@src/services/app-lifecycle/impl';
import { CodePushServiceImpl } from '@src/services/code-push/impl';
import { HotpatchDelegate } from '@src/services/code-push/types';
import * as M from '@src/model';
import { loadNativeBridge, TFNativeBridge } from '@src/util/native-modules';
import Toast from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

import { Provider, observer } from 'mobx-react';
import AppStore from '@src/mobx/app-context';


interface BootProps {
  sessionId: string;
  routeName: string;
  userRole?: string;
  userId?: string;

  envName?: string;
}

interface BootState {
  motd?: string; // 错误提示
  hotpatching?: boolean; // 热更新
}


@observer
@autobind
export class Bootstrap extends React.Component<BootProps, BootState> implements HotpatchDelegate {
  private storageListener: ListenerId;
  private activityController = this.mkActivityController();
  private lifecycle = new FilteredAppLifecycle(f => AppState.addEventListener('change', f), AppState.currentState as any);
  private codePushService = new CodePushServiceImpl();
  private nativeBridge: TFNativeBridge = loadNativeBridge();
  private toastListener: EmitterSubscription;
  private toastRef: Toast;
  private navigatorRef: any;

  constructor(props: BootProps) {
    super(props);
    // i.e. App not yet initialized.
    this.state = {
    };
  }

  mkActivityController(): ActivityIndicatorController {
    return {
      show: (opts: BlockingAnimationOptions) => {
        return AppStore.addBlockingAnimation(opts);
      },
      hide: () => {
        return AppStore.removeBlockingAnimation();
      },
      onLoadError: async (anyE: any) => {
        const strings = AppStore.app.localizedStrings;
        presentExceptionAsAlert(anyE, strings.errormap);
      },
    };
  }

  async modifyState(f: (s: BootState) => void) {
    return new Promise<void>(k => this.setState(copyWith(this.state, f), k));
  }

  checkForHotpatch() {
    this.codePushService.checkForHotpatch(this.env.codePushDeploymentKey, this);
  }

  cleanUpNotificationBadgesIOS() {
    if (Platform.select({ ios: true, android: false })) {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  }

  onAppResume() {
    this.checkForHotpatch();
    this.cleanUpNotificationBadgesIOS();
  }

  // XXX: This method is huge.
  async initEverything() {
    const { env } = this;
    this.lifecycle.attachListener(x => {
      if (x === 'active') {
        this.onAppResume();
      }
      return Promise.resolve(undefined);
    });

    await AppStore.loadService(env, {
      activity: this.activityController,
      lifecycle: this.lifecycle,
      initProps: {
        sessionId: this.props.sessionId,
        userRole: this.props.userRole,
        userId: this.props.userId,
        routeName: this.props.routeName,
        successCheck: this.successCheck
      },
    });

    await AppStore.loadAppState();
  }

  async successCheck(response: any): Promise<any> {
    const res = response as M.BaseResponse<any>;
    // 更新session id
    // if (res.newSessionId && res.newSessionId.trim().length > 0) {
    //   await this.nativeBridge.updateSessionId(res.newSessionId);
    //   AppStore.app.webService.updateSessionToken(res.newSessionId);
    // }
    //  error 处理
    // if (!res.success) {
    //   const jsonResult = Object.assign({}, res, {
    //     body: undefined
    //   });
    //   await this.nativeBridge.processResponseError(jsonResult);
    // }

    return Promise.resolve(res);
  }

  get env() {
    return EnvConfig.envFrom(this.props.envName);
  }

  componentWillMount() {

    console.log('========= env ==========' + this.props.envName +
      ' ,sessionId:' + this.props.sessionId + ' ,role:' + this.props.userRole +
      ' ,userId:' + this.props.userId +
      ' , routeName:' + this.props.routeName
    );
    PerfTracer.enterAsync('initEverything', () => this.initEverything());
  }

  componentWillUnmount() {
    if (this.toastListener) {
      this.toastListener.remove();
    }
  }

  componentDidMount() {
    this.toastListener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.toastRef.show(text);
    });
  }

  onHotpatchDownloadStart() {
    console.log('==== code-push onHotpatchDownloadStart! ===');
    // const { app } = this.state;
    if (AppStore.app) {
      this.modifyState(s => s.hotpatching = true);
      this.activityController.show({
        text: this.codePushService.renderHotpatchDownloadingMessage(AppStore.app)
      });
    }
  }

  onHotpatchDownloadProgress(done: number, total: number) {
    console.log(`code-push onHotpatchDownloadProgress done is ${done},total is ${total}`);
    // const { AppStore.app } = this.state;
    if (AppStore.app) {
      this.activityController.show({
        text: this.codePushService.renderHotpatchDownloadingMessage(AppStore.app, done * 1.0 / total),
      });
    }
  }

  async onHotpatchDownloadFinish() {
    console.log('===== code-push onHotpatchDownloadFinish! ====');
    // Before restarting the app to install the update, to avoid surprising the user,
    // we first display a notification to the user for 2 seconds.
    await delay(2000);

    this.activityController.hide();

    this.codePushService.allowReStart();
  }


  render() {
    const { hotpatching } = this.state;
    if (AppStore.app && AppStore.states) {
      const { blockingAnimationStack } = AppStore.states.interaction;
      const topmostIx = blockingAnimationStack.length;
      const topmost = blockingAnimationStack[topmostIx - 1] || {};
      return (
        <Provider appStore={AppStore}>
          <SafeAreaView style={styles.flex}>
            <AppNavigator
              ref={(r: any) => this.navigatorRef = r}
            // screenProps={{ ...ctx }}
            />
            <Toast
              ref={(r: Toast) => this.toastRef = r}
              style={styles.toastBg}
              textStyle={styles.toastText}
            />
            {(topmostIx > 0 || hotpatching) && <BlockerOverlayLoading opts={topmost} />}
          </SafeAreaView>
        </Provider>
      );
    } else {
      return (
        <FullscreenLoadingView>
          <Text>正在加载</Text>
          {this.renderMotd()}
        </FullscreenLoadingView>
      );
    }
  }

  renderMotd(): null | JSX.Element[] | JSX.Element {
    const { motd } = this.state;
    if (!motd) {
      return null;
    } else {
      if (motd.length > 15) {
        const afterComma = motd.indexOf('，') + 1;
        if (afterComma !== 0) {
          const fst = motd.substring(0, afterComma);
          const snd = motd.substring(afterComma);
          return [
            <Text>{fst}</Text>,
            <Text>{snd}</Text>
          ];
        }
      }
      return <Text>{motd}</Text>;
    }
  }

}


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: ThemeRed.GNavBgColor,
  },
  toastBg: {
    backgroundColor: '#333333',
    opacity: 0.8
  },
  toastText: {
    fontSize: 16,
    color: 'white',
  }
});

