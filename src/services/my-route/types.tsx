import * as M from '@src/model';

export interface MyRouteService {
    getRouteList(): Promise<M.MyRouteListResp>;
    deleteRoute(params: DeleteRouteRequest): Promise<M.BaseResponse<boolean>>;
    getCityInfoList(): Promise<M.CityInfoListResp>;
    getGoodTypesList(): Promise<M.GoodTypesListResp>;
    addRoute(params: AddRouteRequest): Promise<M.BaseResponse<boolean>>;
}


export interface DeleteRouteRequest {
    id: string;
}

export interface AddRouteRequest {
    senderArea: string;
    recipientArea: string;
    goodsType: string;
}
