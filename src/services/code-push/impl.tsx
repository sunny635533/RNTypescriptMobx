import { CodePushService, HotpatchDelegate, AppService, } from '@src/services/code-push/types';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { LocalizedStrings } from '@src/main/strings';
import CodePush from 'react-native-code-push';


interface DownloadProgress {
  totalBytes: number;
  receivedBytes: number;
}

interface Metadata {
  required: string;
  message: string;
  uri: string;
}

export class CodePushServiceImpl implements CodePushService {

  renderHotpatchDownloadingMessage(app: AppService, percent?: number): string {
    let extra = '';
    if (percent && (percent >= 0 || percent <= 1)) {
      extra = `(${Math.ceil(percent * 100)} %)`;
    }
    const updateString: string = app.localizedStrings.bundleUpdating;
    return `${updateString} ${extra}`;
  }

  checkForHotpatch(deploymentKey: string, delegate: HotpatchDelegate) {
    console.log('======= checkForHotpatch =======' + deploymentKey);

    CodePush.disallowRestart();
    try {
      CodePush.sync({
        deploymentKey: deploymentKey,
        installMode: CodePush.InstallMode.ON_NEXT_SUSPEND, // IMMEDIATE  
        minimumBackgroundDuration: 30
      }, (status: number) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            delegate.onHotpatchDownloadStart();
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            delegate.onHotpatchDownloadFinish();
            break;
        }
      }, (progress: DownloadProgress) => {
        delegate.onHotpatchDownloadProgress(progress.receivedBytes, progress.totalBytes);
      });
    } catch (e) {
      console.log('========== checkForHotpatch sync =======exception:' + JSON.stringify(e));
    }

  }

  mkAlert(metadata: Metadata, strings: LocalizedStrings) {
    Alert.alert(strings.lbl_force_upgrade, metadata.message, [{
      text: strings.btn_force_upgrade,
      onPress: () => {
        this.doUpgrade(metadata.uri);
        // Make sure the alert dialog doesn't fall off.
        this.mkAlert(metadata, strings);
      }
    }]);
  }

  doUpgrade(updateUri: string) {
    Linking.openURL(updateUri);
  }

  allowReStart(): void {
    CodePush.allowRestart();
  }

  // shouldForceUpgradeNativeApp(app: AppService): boolean {
  //   const config = app.systemConfig.get();
  //   const strings = app.localizedStrings;
  //   const metadata = {
  //     required: config.version,
  //     message: config.message,
  //     uri: config.url
  //   };

  //   if (config.need_upgrade) {
  //     // Current < required: do force upgrade.
  //     this.mkAlert(metadata, strings);
  //     return true;
  //   }
  //   return false;
  // }

}