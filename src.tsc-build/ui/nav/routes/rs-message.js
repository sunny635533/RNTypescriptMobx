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
const message_1 = require("@src/ui/message");
const NS = __importStar(require("@src/ui/nav/constant"));
exports.MessageNavigator = react_navigation_1.createStackNavigator({
    [NS.ROUTE_MESSAGE_SCREEN]: {
        path: NS.ROUTE_MESSAGE_SCREEN,
        screen: message_1.MessageScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: true,
        },
    },
}, {
    initialRouteName: NS.ROUTE_MESSAGE_SCREEN,
    navigationOptions: {
        headerBackTitle: null,
        headerTitleStyle: { alignSelf: 'center' },
        gesturesEnabled: false,
    }
});
