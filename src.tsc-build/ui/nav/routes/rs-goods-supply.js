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
const goods_supply_1 = require("@src/ui/goods-supply");
const NS = __importStar(require("@src/ui/nav/constant"));
exports.GoodsSupplyNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_GOODSAPPLY_SCREEN]: {
        screen: goods_supply_1.GoodsSupplyScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
}, {
    initialRouteName: NS.ROUTE_GOODSAPPLY_SCREEN,
    navigationOptions: {
        headerBackTitle: null,
        headerTitleStyle: { alignSelf: 'center' },
        gesturesEnabled: false,
    }
});
