"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const M = __importStar(require("@src/model"));
var DefaultStorageValues;
(function (DefaultStorageValues) {
    function state() {
        return {
            language: M.Language.CN,
            notificationEnabled: true,
        };
    }
    DefaultStorageValues.state = state;
})(DefaultStorageValues = exports.DefaultStorageValues || (exports.DefaultStorageValues = {}));
async function buildDefaultStorageStateFromNative(bridge) {
    const vs = DefaultStorageValues.state();
    const legacyAppStorage = await bridge.readLegacyAppStorage();
    if (legacyAppStorage) {
        const { appConfig } = legacyAppStorage;
        if (appConfig) {
            vs.language = appConfig.language.toLowerCase().startsWith('cn')
                ? M.Language.CN
                : M.Language.EN;
            vs.notificationEnabled = appConfig.notificationEnabled;
        }
    }
    return vs;
}
exports.buildDefaultStorageStateFromNative = buildDefaultStorageStateFromNative;
