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
const membership_1 = require("@src/ui/membership");
const NS = __importStar(require("@src/ui/nav/constant"));
exports.MemebershipNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_LOGIN_SCREEN]: {
        screen: membership_1.LoginScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
    [NS.ROUTE_REFGISTER_SCREEN]: {
        screen: membership_1.RegisterScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
}, {
    initialRouteName: NS.ROUTE_LOGIN_SCREEN,
    navigationOptions: {
        headerBackTitle: null,
        headerTitleStyle: { alignSelf: 'center' },
        gesturesEnabled: false,
    }
});
