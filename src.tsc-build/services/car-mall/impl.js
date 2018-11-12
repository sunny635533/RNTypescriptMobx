"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const M = __importStar(require("@src/model"));
const B = __importStar(require("@src/web-api"));
const alwaysSucceed = B.Impl.alwaysSucceedD;
class CarMallServiceImpl {
    constructor(webService, env) {
        this.webService = webService;
        this.env = env;
        this.apiConfig = M.getApiConfig(env.host);
    }
    formParams(p) {
        let params = '';
        Object.keys(p).map((key) => {
            params = params + '&' + key + '=' + p[key];
        });
        params = '?' + params.replace('&', '');
        return params;
    }
    getNearByOilStore(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.getNearByOilStore;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
            return data;
        });
    }
    getCarStoreInfo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.carStoreInfo;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
            return data;
        });
    }
    getGoods(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.carStoreGoodsInfo;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
            return data;
        });
    }
    submit(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.carSubmit;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
            return data;
        });
    }
}
exports.CarMallServiceImpl = CarMallServiceImpl;
