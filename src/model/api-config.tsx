

export interface ApiConfig {
  transitInfoStat: string;
  classifyStatRecordList: string;

  routeList: string;
  routeDelete: string;
  queryCityInfo: string;
  findGoodsType: string;
  routeCreate: string;

  getNearByOilStore: string;
  carStoreInfo: string;
  carStoreGoodsInfo: string;
  carSubmit: string;
}

export function getApiConfig(host: string): ApiConfig {
  return {
    transitInfoStat: host + 'carrier/app/bill/transitInfoStat.do',
    classifyStatRecordList: host + 'carrier/app/bill/classifyStatRecordList.do',

    routeList: host + 'carrier/commonLine/list.do',
    routeDelete: host + 'carrier/commonLine/delete.do',
    queryCityInfo: host + 'carrier/app/areaQuery/queryAll.do',
    findGoodsType: host + 'carrier/commonLine/findGoodsType.do',
    routeCreate: host + 'carrier/commonLine/create.do',

    getNearByOilStore: host + 'uic/carMall/getNearByOilStore.do',
    carStoreInfo: host + 'uic/carMall/carStoreInfo.do',
    carStoreGoodsInfo: host + 'uic/carMall/carStoreGoodsInfo.do',
    carSubmit: host + 'order/submit.do',
  };
}
