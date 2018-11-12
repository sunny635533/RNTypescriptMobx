import {
  KeyValueBackendService,
} from '@src/services/storage-backend/types';
import {
  PersistentValue,
  Conv,
} from '@src/services/storage-backend/util';
import * as T from '@src/services/storage/types';
import * as M from '@src/model';
import { IRef } from '@src/util/mutref';

async function loadLanguage(
  service: KeyValueBackendService,
  defaultValue: M.Language.Type
): Promise<PersistentValue<M.Language.Type>> {
  const v = new PersistentValue(
    'language',
    Conv.jsonConvWithValidator<M.Language.Type>(M.Language.check),
    service);

  await v.load(() => defaultValue);
  return v;
}

async function loadBoolean(
  backend: KeyValueBackendService,
  key: string,
  defaultValue: boolean
): Promise<PersistentValue<boolean>> {
  const v = new PersistentValue(
    key,
    Conv.jsonConvWithValidator<boolean>(x => typeof x === 'boolean'),
    backend);
  await v.load(() => defaultValue);
  return v;
}


// async function loadNumber(
//   backend: KeyValueBackendService,
//   key: string,
//   defaultValue: number
// ): Promise<PersistentValue<number>> {
//   const v = new PersistentValue(
//     key,
//     Conv.jsonConvWithValidator<number>(x => typeof x === 'number'),
//     backend);
//   await v.load(() => defaultValue);
//   return v;
// }

export class PersistentStorageService implements T.StorageService {
  private language_: PersistentValue<M.Language.Type>;
  private notificationEnabled_: PersistentValue<boolean>;

  private constructor(private backend: KeyValueBackendService) {
  }

  get language(): IRef<M.Language.Type> { return this.language_; }
  get notificationEnabled(): IRef<boolean> { return this.notificationEnabled_; }

  private async loadInternal(defaultValues: T.StorageState) {
    this.language_ = await loadLanguage(this.backend, defaultValues.language);
    this.notificationEnabled_ = await loadBoolean(this.backend, 'notificationEnabled', defaultValues.notificationEnabled);
  }

  static async load(
    backend: KeyValueBackendService,
    defaultValues: T.StorageState
    // TODO: Inject default values here.
  ): Promise<PersistentStorageService> {
    const thiz = new PersistentStorageService(backend);
    await thiz.loadInternal(defaultValues);
    return thiz;
  }
}

