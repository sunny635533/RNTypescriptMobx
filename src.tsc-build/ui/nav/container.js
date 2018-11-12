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
const routes_1 = require("@src/ui/nav/routes");
const Constants = __importStar(require("@src/ui/nav/constant"));
exports.Constants = Constants;
const router_mapper_1 = require("@src/ui/nav/router-mapper");
exports.AppNavigator = react_navigation_1.createSwitchNavigator({
    [Constants.ROUTE_MY_ROUTE_NAVIGATOR]: {
        screen: routes_1.MyRouteNavigator,
    },
    [Constants.ROUTE_MAPPER]: {
        screen: router_mapper_1.RouterMapperScreen
    }
}, {
    initialRouteName: Constants.ROUTE_MAPPER,
});
exports.getRouteName = (router) => {
    if (router.routes) {
        return exports.getRouteName(router.routes[router.index]);
    }
    else {
        return router.routeName;
    }
};
function routeNavigate(navigatorRef, routeName = Constants.ROUTE_MY_ROUTE_NAVIGATOR, params = {}) {
    navigatorRef.dispatch(react_navigation_1.NavigationActions.navigate({
        routeName,
        params,
    }));
}
exports.routeNavigate = routeNavigate;
