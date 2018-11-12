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
const B = __importStar(require("@src/web-api"));
const alwaysSucceed = B.Impl.alwaysSucceedD;
const DRIVER_HOST = 'https://sj.redlion56.com/gwsj/';
const CHE_ZHU_HOST = 'https://cz.redlion56.com/gwcz/';
class MyRouteServiceImpl {
    constructor(webService, userRole, env) {
        this.webService = webService;
        this.userRole = userRole;
        this.env = env;
        if ('sj' === userRole) {
            this.host = DRIVER_HOST;
        }
        else {
            this.host = CHE_ZHU_HOST;
        }
        this.apiConfig = M.getApiConfig(env.host);
    }
    async getRouteList() {
        const uri = M.getApiConfig(this.host).routeList;
        const data = B.Impl.okOrThrow(await B.Impl.postJson(this.webService, uri, {}, alwaysSucceed));
        return data;
    }
    async deleteRoute(params) {
        const uri = M.getApiConfig(this.host).routeDelete;
        const data = B.Impl.okOrThrow(await B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
        return data;
    }
    async getCityInfoList() {
        const uri = this.apiConfig.queryCityInfo;
        const data = B.Impl.okOrThrow(await B.Impl.postJson(this.webService, uri, {}, alwaysSucceed));
        return data;
    }
    async getGoodTypesList() {
        const uri = this.apiConfig.findGoodsType;
        const data = B.Impl.okOrThrow(await B.Impl.postJson(this.webService, uri, {}, alwaysSucceed));
        return data;
    }
    async addRoute(params) {
        const uri = this.apiConfig.routeCreate;
        const data = B.Impl.okOrThrow(await B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
        return data;
    }
}
exports.MyRouteServiceImpl = MyRouteServiceImpl;
