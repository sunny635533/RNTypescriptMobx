import { Language } from '@src/model';
import { IRef } from '@src/util/mutref';
// import * as M from '@src/model';

// If only we have HKT...
export interface StorageState {
  notificationEnabled: boolean;
  language: Language.Type;
}

export interface StorageService {
  notificationEnabled: IRef<boolean>;
  language: IRef<Language.Type>;
}

