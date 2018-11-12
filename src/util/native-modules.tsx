import * as RN from 'react-native';
import * as M from '@src/model';

export interface TFNativeBridge {
  readLegacyAppStorage(): Promise<LegacyAppStorage | undefined>;
  // comeBackNativeController(): Promise<void>; // 返回原生界面的方法
  // processResponseError(response: M.BaseResponse<any>): Promise<string>; // z处理网络错误
  // updateSessionId(sessionId: string): Promise<string>; // 更新sessionId
}

export interface Location {
  lat: string;
  lng: string;
  address?: string;
}

interface LegacyAppStorage {
  appConfig?: {
    language: string,
    notificationEnabled: boolean,
  };
}

export function loadNativeBridge(): TFNativeBridge {
  if (RN) {
    return RN.NativeModules.TFNativeBridge;
  } else {
    throw new Error('Not running in the RN environment');
  }
}