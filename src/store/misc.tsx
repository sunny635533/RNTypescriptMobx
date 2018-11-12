import { autobind } from 'core-decorators';
import { StorageState, StorageService } from '@src/services/storage/types';
import { IRef, ListenerId } from '@src/util/mutref';

type Listener = (v: StorageState) => Promise<void>;

// XXX: Need a more generic way to do this.
// We might be able to use redux since TypeScript got sum type support recently...
@autobind
export class StorageStateRef extends IRef<StorageState> {
  constructor(private refs: StorageService) {
    super();
  }

  get value(): StorageState {
    return read(this.refs);
  }

  async setValue(v: StorageState): Promise<void> {
    const v0 = this.value;
    if (v.language !== v0.language) {
      await this.refs.language.setValue(v.language);
    }
    if (v.notificationEnabled !== v0.notificationEnabled) {
      await this.refs.notificationEnabled.setValue(v.notificationEnabled);
    }
  }

  attachListener(f: Listener): ListenerId {
    const i1 = this.refs.language.attachListener(_ => this.fire(f));
    const i2 = this.refs.notificationEnabled.attachListener(_ => this.fire(f));
    return {
      remove() {
        [i1, i2].forEach(i => i.remove());
      }
    };
  }

  fire(f: Listener) {
    return f(this.value);
  }
}

function read(service: StorageService): StorageState {
  return {
    language: service.language.value,
    notificationEnabled: service.notificationEnabled.value,
  };
}

