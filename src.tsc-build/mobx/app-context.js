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
const types_1 = require("@src/services/app/types");
exports.AppService = types_1.AppService;
exports.AppStates = types_1.AppStates;
const mobx_1 = require("mobx");
const impl_1 = require("@src/services/interaction/impl");
const T = __importStar(require("@src/services/app/types"));
const impl_whatwg_fetch_1 = require("@src/web-api/impl-whatwg-fetch");
const M = __importStar(require("@src/model"));
const util_1 = require("@src/util");
const native_modules_1 = require("@src/util/native-modules");
const util_2 = require("@src/services/storage/util");
const impl_2 = require("@src/services/storage/impl");
const impl_3 = require("@src/services/storage-backend/impl");
const react_native_code_push_1 = __importDefault(require("react-native-code-push"));
const Store = __importStar(require("@src/store"));
const perf = util_1.PerfTracer.enterAsync;
class AppContext {
    async loadService(env, init) {
        this.app = new types_1.AppService();
        this.app.env = env;
        const storageState = await perf('app.init.loadStorageNative', () => util_2.buildDefaultStorageStateFromNative(native_modules_1.loadNativeBridge()));
        this.app.storage = await perf('app.init.loadAsyncStorage', () => impl_2.PersistentStorageService.load(impl_3.asyncStorageBackend(), storageState));
        this.app.interaction = new impl_1.InteractionServiceImpl(init.activity);
        this.app.webService = new impl_whatwg_fetch_1.FetchService(10000, init.initProps.successCheck, init.initProps.sessionId);
        this.app.userRole = init.initProps.userRole ? init.initProps.userRole : '';
        this.app.userId = init.initProps.userId ? init.initProps.userId : '';
        this.app.routeName = init.initProps.routeName;
        this.app.versionLabel = '';
        try {
            react_native_code_push_1.default.getUpdateMetadata().then((pkg) => {
                console.log('========== getUpdateMetadata =======' + JSON.stringify(pkg));
                if (pkg && pkg.label) {
                    this.app.versionLabel = pkg.label;
                }
            });
        }
        catch (e) {
            console.log('========= catch app init getUpdateMetadata() ======== exception:' + JSON.stringify(e));
        }
        this.app.localizedStrings = M.Language.choose(this.app.storage.language.value, T.strings);
    }
    async loadAppState() {
        const storageRef = new Store.misc.StorageStateRef(this.app.storage);
        this.states = {
            interaction: {
                blockingAnimationStack: [],
            },
            storage: storageRef.value,
        };
        storageRef.attachListener(async (state) => {
            this.states.storage = state;
            console.warn('======== attachListener ====== ' + JSON.stringify(this.states.storage));
        });
    }
    get localStrings() {
        this.app.localizedStrings = M.Language.choose(this.app.storage.language.value, T.strings);
        return this.app.localizedStrings;
    }
    async addBlockingAnimation(opts) {
        this.states.interaction.blockingAnimationStack.push(opts);
    }
    async removeBlockingAnimation() {
        this.states.interaction.blockingAnimationStack.pop();
    }
    async changedStoreLang(lang) {
        await this.app.storage.language.setValue(lang);
    }
    async updateSessionToken(newSessionId) {
        this.app.webService.updateSessionToken(newSessionId);
    }
}
__decorate([
    mobx_1.observable
], AppContext.prototype, "app", void 0);
__decorate([
    mobx_1.observable
], AppContext.prototype, "states", void 0);
__decorate([
    mobx_1.action
], AppContext.prototype, "loadService", null);
__decorate([
    mobx_1.action
], AppContext.prototype, "loadAppState", null);
__decorate([
    mobx_1.action
], AppContext.prototype, "addBlockingAnimation", null);
__decorate([
    mobx_1.action
], AppContext.prototype, "removeBlockingAnimation", null);
__decorate([
    mobx_1.action
], AppContext.prototype, "changedStoreLang", null);
__decorate([
    mobx_1.action
], AppContext.prototype, "updateSessionToken", null);
exports.AppContext = AppContext;
const appContext = new AppContext();
exports.default = appContext;
