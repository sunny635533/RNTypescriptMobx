import { ListenerId } from '@src/util/mutref';
import { AppStateStatus } from 'react-native';
export {
  AppStateStatus
};
export type Listener = (s: AppStateStatus) => Promise<void>;

export interface AppLifecycleProvider {
  attachListener(f: Listener): ListenerId;
  currentState: AppStateStatus;

  // XXX: This is ugly.
  fireOnResume(): void;
  ignoreNextActivityLaunchAndroid(): void;
}
