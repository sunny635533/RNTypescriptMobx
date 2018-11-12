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
const transport_account_1 = require("@src/ui/transport-account");
const Constants = __importStar(require("@src/ui/nav/constant"));
exports.TransportAccountNavigator = react_navigation_1.createStackNavigator({
    [Constants.ROUTE_TRANSPORT_ACCOUNT]: {
        screen: transport_account_1.TransportAccountScreen,
        navigationOptions: {
            header: null,
        },
    },
    [Constants.ROUTE_TRANSPORT_ACCOUNT_DETAILS]: {
        screen: transport_account_1.TransportAccountDetailsScreen,
        navigationOptions: {
            header: null,
        },
    },
}, {
    initialRouteName: Constants.ROUTE_TRANSPORT_ACCOUNT,
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'none',
    cardStyle: { shadowColor: 'transparent' },
});
