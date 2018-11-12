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
const my_route_1 = require("@src/ui/my-route");
const NS = __importStar(require("@src/ui/nav/constant"));
exports.MyRouteNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_MY_ROUTE]: {
        screen: my_route_1.MyRouteScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
    [NS.ROUTE_ADD_ROUTE]: {
        screen: my_route_1.AddRouteScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
}, {
    initialRouteName: NS.ROUTE_MY_ROUTE,
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'none',
    cardStyle: { shadowColor: 'transparent' },
});
