"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const react_native_code_push_1 = __importDefault(require("react-native-code-push"));
class CodePushServiceImpl {
    renderHotpatchDownloadingMessage(app, percent) {
        let extra = '';
        if (percent && (percent >= 0 || percent <= 1)) {
            extra = `(${Math.ceil(percent * 100)} %)`;
        }
        const updateString = app.localizedStrings.bundleUpdating;
        return `${updateString} ${extra}`;
    }
    checkForHotpatch(deploymentKey, delegate) {
        console.log('======= checkForHotpatch =======' + deploymentKey);
        react_native_code_push_1.default.disallowRestart();
        try {
            react_native_code_push_1.default.sync({
                deploymentKey: deploymentKey,
                installMode: react_native_code_push_1.default.InstallMode.ON_NEXT_SUSPEND,
                minimumBackgroundDuration: 30
            }, (status) => {
                switch (status) {
                    case react_native_code_push_1.default.SyncStatus.DOWNLOADING_PACKAGE:
                        delegate.onHotpatchDownloadStart();
                        break;
                    case react_native_code_push_1.default.SyncStatus.UPDATE_INSTALLED:
                    case react_native_code_push_1.default.SyncStatus.UNKNOWN_ERROR:
                        delegate.onHotpatchDownloadFinish();
                        break;
                }
            }, (progress) => {
                delegate.onHotpatchDownloadProgress(progress.receivedBytes, progress.totalBytes);
            });
        }
        catch (e) {
            console.log('========== checkForHotpatch sync =======exception:' + JSON.stringify(e));
        }
    }
    mkAlert(metadata, strings) {
        react_native_2.Alert.alert(strings.lbl_force_upgrade, metadata.message, [{
                text: strings.btn_force_upgrade,
                onPress: () => {
                    this.doUpgrade(metadata.uri);
                    this.mkAlert(metadata, strings);
                }
            }]);
    }
    doUpgrade(updateUri) {
        react_native_1.Linking.openURL(updateUri);
    }
    allowReStart() {
        react_native_code_push_1.default.allowRestart();
    }
}
exports.CodePushServiceImpl = CodePushServiceImpl;
