"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const assets_1 = __importDefault(require("@src/main/assets"));
const container_1 = require("@src/ui/nav/container");
const base_component_1 = require("@src/ui/base-component");
const header_1 = require("@src/ui/nav/header");
class NextScreen extends base_component_1.BaseComponent {
    render() {
        return (React.createElement(react_native_1.View, { style: [styles.container, { alignItems: 'center' }] },
            React.createElement(header_1.NavigatorBar, { leftButton: {
                    image: assets_1.default.chezhu.back,
                    action: () => {
                        this.props.navigation.goBack();
                    },
                    imageStyle: { width: 40, height: 40, alignItems: 'center' }
                }, title: 'NextScreen' }),
            React.createElement(react_native_1.Text, null, "THis is NextScreen!"),
            React.createElement(react_native_1.Button, { title: '跳到钱包', onPress: () => this.props.navigation.navigate(container_1.Contants.ROUTE_WALLET_NAVIGATOR) })));
    }
}
exports.NextScreen = NextScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
