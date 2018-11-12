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
const home_1 = require("@src/ui/home");
const NS = __importStar(require("@src/ui/nav/constant"));
exports.HomeNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_HOME_SCREEN]: {
        screen: home_1.HomeScreen,
    },
    [NS.ROUTE_NEXT_SCREEN]: {
        screen: home_1.NextScreen,
    },
}, {
    initialRouteName: NS.ROUTE_HOME_SCREEN,
    navigationOptions: {
        header: null,
        headerBackTitle: null,
        headerTitleStyle: { alignSelf: 'center' },
        gesturesEnabled: false,
    }
});
