import { BaseResponse } from '@src/model';

export interface MyRoute {
    id: string;
    goodsTypeName: string;
    recipientCity: string;
    recipientProvince: string;
    recipientDistrict: string;
    senderCity: string;
    senderDistrict: string;
    senderProvince: string;
}

export interface CityInfo {
    currentCity: boolean;
    id: string;
    level: number;
    name: string;
    parentId: string;
}

export interface GoodTypes {
    key: number;
    value: string;
}


export interface MyRouteListResp extends BaseResponse<MyRoute[]> {
}

export interface CityInfoListResp extends BaseResponse<CityInfo[]> {
}

export interface GoodTypesListResp extends BaseResponse<GoodTypes[]> {
}