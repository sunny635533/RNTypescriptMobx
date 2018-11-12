import {
  AsyncStorage,
} from 'react-native';

import * as T from '@src/services/storage-backend/types';
import { unwatchFile } from 'fs';

export function inMemoryBackend(): T.KeyValueBackendService {
  const store: { [key: string]: string } = {};
  return {
    setItem: async (key: string, value: string) => {
      store[key] = value;
    },
    getItem: async (key: string) => {
      return store[key];
    },
    removeItem: async (key: string) => {
      delete store[key];
    },
  };
}

export function asyncStorageBackend(): T.KeyValueBackendService {
  return {
    setItem: async (key: string, value: string) => {
      await AsyncStorage.setItem(key, value);
    },
    getItem: async (key: string) => {
      return await AsyncStorage.getItem(key);
    },
    removeItem: async (key: string) => {
      await AsyncStorage.removeItem(key);
    },
  };
}
