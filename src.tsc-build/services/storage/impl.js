"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@src/services/storage-backend/util");
const M = __importStar(require("@src/model"));
async function loadLanguage(service, defaultValue) {
    const v = new util_1.PersistentValue('language', util_1.Conv.jsonConvWithValidator(M.Language.check), service);
    await v.load(() => defaultValue);
    return v;
}
async function loadBoolean(backend, key, defaultValue) {
    const v = new util_1.PersistentValue(key, util_1.Conv.jsonConvWithValidator(x => typeof x === 'boolean'), backend);
    await v.load(() => defaultValue);
    return v;
}
class PersistentStorageService {
    constructor(backend) {
        this.backend = backend;
    }
    get language() { return this.language_; }
    get notificationEnabled() { return this.notificationEnabled_; }
    async loadInternal(defaultValues) {
        this.language_ = await loadLanguage(this.backend, defaultValues.language);
        this.notificationEnabled_ = await loadBoolean(this.backend, 'notificationEnabled', defaultValues.notificationEnabled);
    }
    static async load(backend, defaultValues) {
        const thiz = new PersistentStorageService(backend);
        await thiz.loadInternal(defaultValues);
        return thiz;
    }
}
exports.PersistentStorageService = PersistentStorageService;
