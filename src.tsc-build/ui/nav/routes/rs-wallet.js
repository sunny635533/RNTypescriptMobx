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
const wallet_1 = require("@src/ui/wallet");
const NS = __importStar(require("@src/ui/nav/constant"));
exports.WalletNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_WALLET_SCREEN]: {
        path: NS.ROUTE_WALLET_SCREEN,
        screen: wallet_1.WalletScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
}, {
    initialRouteName: NS.ROUTE_WALLET_SCREEN,
    navigationOptions: {
        headerBackTitle: null,
        headerTitleStyle: { alignSelf: 'center' },
        gesturesEnabled: false,
    }
});
