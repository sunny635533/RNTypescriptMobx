// import { ActivityIndicatorController, InteractionServiceImpl } from '@src/services/interaction/impl';
// import * as T from '@src/services/app/types';
// import { FetchService, SuccessCheck } from '@src/web-api/impl-whatwg-fetch';
// import * as M from '@src/model';
// import { PerfTracer } from '@src/util';
// import { IRef } from '@src/util/mutref';
// import { loadNativeBridge } from '@src/util/native-modules';
// import { buildDefaultStorageStateFromNative } from '@src/services/storage/util';
// import { PersistentStorageService } from '@src/services/storage/impl';
// import { asyncStorageBackend } from '@src/services/storage-backend/impl';
// import CodePush, { LocalPackage } from 'react-native-code-push';

// const perf = PerfTracer.enterAsync;

// interface InitProps {
//   sessionId: string;
//   routeName: string;
//   successCheck: SuccessCheck<any>;
//   userRole?: string;
//   userId?: string;
// }

// interface DefaultAppServiceImplInit {
//   activity: ActivityIndicatorController;
//   lifecycle: T.AppLifecycleProvider;
//   initProps: InitProps;
// }

// export class DefaultAppServiceImpl implements T.AppService {
//   private storage_: T.StorageService;
//   private interaction_: T.InteractionService;
//   private webService_ = new FetchService;

//   // CodePush label
//   private versionLabel_: string;
//   private userRole_: string;
//   private userId_: string;
//   private routeName_: string;
//   private storeId_: string;

//   private constructor(private env_: M.Env, private init_: DefaultAppServiceImplInit) {
//   }

//   static async load(
//     env: M.Env,
//     init: DefaultAppServiceImplInit
//   ): Promise<T.AppService> {
//     const app = new DefaultAppServiceImpl(env, init);
//     const storageState = await perf('app.init.loadStorageNative',
//       () => buildDefaultStorageStateFromNative(loadNativeBridge()));
//     app.storage_ = await perf('app.init.loadAsyncStorage',
//       () => PersistentStorageService.load(asyncStorageBackend(), storageState));
//     app.interaction_ = new InteractionServiceImpl(init.activity);

//     app.webService_ = new FetchService(10000, init.initProps.successCheck, init.initProps.sessionId);
//     app.userRole_ = init.initProps.userRole ? init.initProps.userRole : '';
//     app.userId_ = init.initProps.userId ? init.initProps.userId : '';
//     app.routeName_ = init.initProps.routeName;
    
//     app.versionLabel_ = '';
//     try {
//       CodePush.getUpdateMetadata().then((pkg: LocalPackage) => {
//         console.log('========== getUpdateMetadata =======' + JSON.stringify(pkg));
//         if (pkg && pkg.label) {
//           // Since it might not exist for dev builds..
//           app.versionLabel_ = pkg.label;
//         }
//       });
//     } catch (e) {
//       console.log('========= catch app init getUpdateMetadata() ======== exception:' + JSON.stringify(e));
//     }

    
//     return app;
//   }

//   get storage(): T.StorageService {
//     return this.storage_;
//   }

//   get interaction(): T.InteractionService {
//     return this.interaction_;
//   }

//   get env(): M.Env {
//     return this.env_;
//   }

//   get lang(): IRef<M.Language.Type> {
//     return this.storage_.language;
//   }

//   get localizedStrings(): T.LocalizedStrings {
//     return M.Language.choose(this.storage.language.value, T.strings);
//   }

//   get lifecycle(): T.AppLifecycleProvider {
//     return this.init_.lifecycle;
//   }

//   get versionLabel(): string {
//     return this.versionLabel_;
//   }

//   get webService(): FetchService {
//     return this.webService_;
//   }

//   get userRole(): string {
//     return this.userRole_;
//   }

//   get userId(): string {
//     return this.userId_;
//   }

//   get routeName(): string {
//     return this.routeName_;
//   }

// }