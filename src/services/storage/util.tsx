import * as M from '@src/model';
import * as T from '@src/services/storage/types';
import * as NM from '@src/util/native-modules';

export namespace DefaultStorageValues {
  export function state(): T.StorageState {
    return {
      language: M.Language.CN,
      // TODO(ios): Read this from PushNotificationIOS.checkPermissions?
      notificationEnabled: true,
    };
  }
}

export async function buildDefaultStorageStateFromNative(bridge: NM.TFNativeBridge): Promise<T.StorageState> {
  const vs = DefaultStorageValues.state();
  const legacyAppStorage = await bridge.readLegacyAppStorage();
   if (legacyAppStorage) {
    const { appConfig } = legacyAppStorage;
    if (appConfig) {
      vs.language = appConfig.language.toLowerCase().startsWith('cn')
        ? M.Language.CN
        : M.Language.EN;
      vs.notificationEnabled = appConfig.notificationEnabled;
    }
  }
  return vs;
}
