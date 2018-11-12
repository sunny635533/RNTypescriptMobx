import { autobind } from 'core-decorators';
import { IRef, MutRef, ListenerId } from '@src/util/mutref';
import * as T from '@src/services/app-lifecycle/types';
import { Platform } from 'react-native';

@autobind
export class FilteredAppLifecycle implements T.AppLifecycleProvider {
  private shouldDropNextActive: boolean = false;
  private sRef: IRef<T.AppStateStatus>;

  constructor(stateSource: (f: T.Listener) => void, initialState: T.AppStateStatus) {
    this.sRef = new MutRef<T.AppStateStatus>(initialState);
    stateSource(this.onChange);
  }

  fireOnResume() {
    this.onChange('active');
  }

  ignoreNextActivityLaunchAndroid() {
    this.shouldDropNextActive = Platform.select({
      ios: false,
      android: true,
    });
  }

  private async onChange(s: T.AppStateStatus) {
    if (s === 'active' && this.shouldDropNextActive) {
      this.shouldDropNextActive = false;
      // And ignore this event.
    } else {
      await this.sRef.setValue(s);
    }
  }

  attachListener(f: T.Listener): ListenerId {
    return this.sRef.attachListener(f);
  }

  get currentState() {
    return this.sRef.value;
  }
}