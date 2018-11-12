"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const core_decorators_1 = require("core-decorators");
const util_1 = require("@src/util");
const EnvConfig = __importStar(require("@src/model/env-config"));
const load_1 = require("@src/ui/load");
const container_1 = require("@src/ui/nav/container");
const colors_1 = require("@src/ui/colors");
const user_facing_errors_1 = require("@src/util/user-facing-errors");
const impl_1 = require("@src/services/app-lifecycle/impl");
const impl_2 = require("@src/services/code-push/impl");
const native_modules_1 = require("@src/util/native-modules");
const react_native_easy_toast_1 = __importDefault(require("react-native-easy-toast"));
const mobx_react_1 = require("mobx-react");
const app_context_1 = __importDefault(require("@src/mobx/app-context"));
let Bootstrap = class Bootstrap extends React.Component {
    constructor(props) {
        super(props);
        this.activityController = this.mkActivityController();
        this.lifecycle = new impl_1.FilteredAppLifecycle(f => react_native_1.AppState.addEventListener('change', f), react_native_1.AppState.currentState);
        this.codePushService = new impl_2.CodePushServiceImpl();
        this.nativeBridge = native_modules_1.loadNativeBridge();
        this.state = {};
    }
    mkActivityController() {
        return {
            show: (opts) => {
                return app_context_1.default.addBlockingAnimation(opts);
            },
            hide: () => {
                return app_context_1.default.removeBlockingAnimation();
            },
            onLoadError: async (anyE) => {
                const strings = app_context_1.default.app.localizedStrings;
                user_facing_errors_1.presentExceptionAsAlert(anyE, strings.errormap);
            },
        };
    }
    async modifyState(f) {
        return new Promise(k => this.setState(util_1.copyWith(this.state, f), k));
    }
    checkForHotpatch() {
        this.codePushService.checkForHotpatch(this.env.codePushDeploymentKey, this);
    }
    cleanUpNotificationBadgesIOS() {
        if (react_native_1.Platform.select({ ios: true, android: false })) {
            react_native_1.PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }
    }
    onAppResume() {
        this.checkForHotpatch();
        this.cleanUpNotificationBadgesIOS();
    }
    async initEverything() {
        const { env } = this;
        this.lifecycle.attachListener(x => {
            if (x === 'active') {
                this.onAppResume();
            }
            return Promise.resolve(undefined);
        });
        await app_context_1.default.loadService(env, {
            activity: this.activityController,
            lifecycle: this.lifecycle,
            initProps: {
                sessionId: this.props.sessionId,
                userRole: this.props.userRole,
                userId: this.props.userId,
                routeName: this.props.routeName,
                successCheck: this.successCheck
            },
        });
        await app_context_1.default.loadAppState();
    }
    async successCheck(response) {
        const res = response;
        return Promise.resolve(res);
    }
    get env() {
        return EnvConfig.envFrom(this.props.envName);
    }
    componentWillMount() {
        console.log('========= env ==========' + this.props.envName +
            ' ,sessionId:' + this.props.sessionId + ' ,role:' + this.props.userRole +
            ' ,userId:' + this.props.userId +
            ' , routeName:' + this.props.routeName);
        util_1.PerfTracer.enterAsync('initEverything', () => this.initEverything());
    }
    componentWillUnmount() {
        if (this.toastListener) {
            this.toastListener.remove();
        }
    }
    componentDidMount() {
        this.toastListener = react_native_1.DeviceEventEmitter.addListener('showToast', (text) => {
            this.toastRef.show(text);
        });
    }
    onHotpatchDownloadStart() {
        console.log('==== code-push onHotpatchDownloadStart! ===');
        if (app_context_1.default.app) {
            this.modifyState(s => s.hotpatching = true);
            this.activityController.show({
                text: this.codePushService.renderHotpatchDownloadingMessage(app_context_1.default.app)
            });
        }
    }
    onHotpatchDownloadProgress(done, total) {
        console.log(`code-push onHotpatchDownloadProgress done is ${done},total is ${total}`);
        if (app_context_1.default.app) {
            this.activityController.show({
                text: this.codePushService.renderHotpatchDownloadingMessage(app_context_1.default.app, done * 1.0 / total),
            });
        }
    }
    async onHotpatchDownloadFinish() {
        console.log('===== code-push onHotpatchDownloadFinish! ====');
        await util_1.delay(2000);
        this.activityController.hide();
        this.codePushService.allowReStart();
    }
    render() {
        const { hotpatching } = this.state;
        if (app_context_1.default.app && app_context_1.default.states) {
            const { blockingAnimationStack } = app_context_1.default.states.interaction;
            const topmostIx = blockingAnimationStack.length;
            const topmost = blockingAnimationStack[topmostIx - 1] || {};
            return (React.createElement(mobx_react_1.Provider, { appStore: app_context_1.default },
                React.createElement(react_native_1.SafeAreaView, { style: styles.flex },
                    React.createElement(container_1.AppNavigator, { ref: (r) => this.navigatorRef = r }),
                    React.createElement(react_native_easy_toast_1.default, { ref: (r) => this.toastRef = r, style: styles.toastBg, textStyle: styles.toastText }),
                    (topmostIx > 0 || hotpatching) && React.createElement(load_1.BlockerOverlayLoading, { opts: topmost }))));
        }
        else {
            return (React.createElement(load_1.FullscreenLoadingView, null,
                React.createElement(react_native_1.Text, null, "\u6B63\u5728\u52A0\u8F7D"),
                this.renderMotd()));
        }
    }
    renderMotd() {
        const { motd } = this.state;
        if (!motd) {
            return null;
        }
        else {
            if (motd.length > 15) {
                const afterComma = motd.indexOf('，') + 1;
                if (afterComma !== 0) {
                    const fst = motd.substring(0, afterComma);
                    const snd = motd.substring(afterComma);
                    return [
                        React.createElement(react_native_1.Text, null, fst),
                        React.createElement(react_native_1.Text, null, snd)
                    ];
                }
            }
            return React.createElement(react_native_1.Text, null, motd);
        }
    }
};
Bootstrap = __decorate([
    mobx_react_1.observer,
    core_decorators_1.autobind
], Bootstrap);
exports.Bootstrap = Bootstrap;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: colors_1.ThemeRed.GNavBgColor,
    },
    toastBg: {
        backgroundColor: '#333333',
        opacity: 0.8
    },
    toastText: {
        fontSize: 16,
        color: 'white',
    }
});
