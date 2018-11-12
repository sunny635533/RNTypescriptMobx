"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const car_mall_1 = require("@src/ui/car-mall");
const NS = __importStar(require("@src/ui/nav/constant"));
const webview_1 = require("@src/ui/webview");
exports.CarMallNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_CONCESSION]: {
        screen: car_mall_1.ConcessionScreen,
        navigationOptions: {
            header: null,
        },
    },
    [NS.ROUTE_STORE]: {
        screen: car_mall_1.StoreScreen,
        navigationOptions: {
            header: null,
        },
    },
    [NS.ROUTE_PRODUCT]: {
        screen: car_mall_1.ProductScreen,
        navigationOptions: {
            header: null,
        },
    },
    [NS.ROUTE_WEBVIEW]: {
        screen: webview_1.WebViewScreen,
        navigationOptions: {
            header: null,
        },
    },
    [NS.ROUTE_PAYOILFEE]: {
        screen: car_mall_1.PayOilFeeScreen,
        navigationOptions: {
            header: null,
        },
    },
    [NS.ROUTE_PRODUCT_DETAIL]: {
        screen: car_mall_1.ProductDetailScreen,
        navigationOptions: {
            header: null,
        },
    },
    [NS.ROUTE_SEARCH]: {
        screen: car_mall_1.SearchScreen,
        navigationOptions: {
            header: null,
        },
    },
}, {
    initialRouteName: NS.ROUTE_CONCESSION,
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'none',
    cardStyle: { shadowColor: 'transparent' },
});
