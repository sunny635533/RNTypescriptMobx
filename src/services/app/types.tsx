import { StorageService, StorageState } from '@src/services/storage/types';
import { InteractionService, InteractionState } from '@src/services/interaction/types';
import * as M from '@src/model';
import { IRef } from '@src/util/mutref';
import { LocalizedStrings, strings } from '@src/main/strings';
import { AppLifecycleProvider } from '@src/services/app-lifecycle/types';
import { FetchService } from '@src/web-api/impl-whatwg-fetch';

export class AppStates {
  interaction: InteractionState;
  storage: StorageState;
}

export class AppService {
  storage: StorageService;
  interaction: InteractionService;
  lifecycle: AppLifecycleProvider;
  webService: FetchService;

  env: M.Env;
  localizedStrings: LocalizedStrings;

  versionLabel: string;

  userRole: string;
  userId: string;
  routeName: string;
}

export {
  StorageService,
  StorageState,
  InteractionService,
  InteractionState,
  LocalizedStrings,
  strings,
  AppLifecycleProvider,
};

export interface AppContext {
  app: AppService;
  states: AppStates;
}

