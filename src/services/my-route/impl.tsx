import * as M from '@src/model';
import { MyRouteService, DeleteRouteRequest, AddRouteRequest } from '@src/services/my-route/types';
import * as B from '@src/web-api';
import { FetchService } from '@src/web-api/impl-whatwg-fetch';

const alwaysSucceed = B.Impl.alwaysSucceedD;

const DRIVER_HOST: string = 'https://sj.redlion56.com/gwsj/';
const CHE_ZHU_HOST: string = 'https://cz.redlion56.com/gwcz/';

export class MyRouteServiceImpl implements MyRouteService {

  // private webService: B.Types.HttpClientService;
  private host: string;
  private apiConfig: M.ApiConfig;

  constructor(private webService: FetchService, private userRole: string, private env: M.Env) {
    // this.webService = new FetchService(60000);
    if ('sj' === userRole) {
      this.host = DRIVER_HOST;
    } else {
      this.host = CHE_ZHU_HOST;
    }
    this.apiConfig = M.getApiConfig(env.host);
  }

  async getRouteList(): Promise<M.MyRouteListResp> {
    const uri = M.getApiConfig(this.host).routeList;
    const data = B.Impl.okOrThrow<M.MyRouteListResp>(
      await B.Impl.postJson<{}, M.MyRouteListResp>(this.webService,
        uri, {}, alwaysSucceed));
    return data;
  }

  async deleteRoute(params: DeleteRouteRequest): Promise<M.BaseResponse<boolean>> {
    const uri = M.getApiConfig(this.host).routeDelete;
    const data = B.Impl.okOrThrow<M.BaseResponse<boolean>>(
      await B.Impl.postJson<DeleteRouteRequest, M.BaseResponse<boolean>>(this.webService,
        uri, params, alwaysSucceed));
    return data;
  }

  async getCityInfoList(): Promise<M.CityInfoListResp> {
    const uri = this.apiConfig.queryCityInfo;
    const data = B.Impl.okOrThrow<M.CityInfoListResp>(
      await B.Impl.postJson<{}, M.CityInfoListResp>(this.webService,
        uri, {}, alwaysSucceed));
    return data;
  }

  async getGoodTypesList(): Promise<M.GoodTypesListResp> {
    const uri = this.apiConfig.findGoodsType;
    const data = B.Impl.okOrThrow<M.GoodTypesListResp>(
      await B.Impl.postJson<{}, M.GoodTypesListResp>(this.webService,
        uri, {}, alwaysSucceed));
    return data;
  }

  async addRoute(params: AddRouteRequest): Promise<M.BaseResponse<boolean>> {
    const uri = this.apiConfig.routeCreate;
    const data = B.Impl.okOrThrow<M.BaseResponse<boolean>>(
      await B.Impl.postJson<AddRouteRequest, M.BaseResponse<boolean>>(this.webService,
        uri, params, alwaysSucceed));
    return data;
  }
}