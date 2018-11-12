"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const container_1 = require("@src/ui/nav/container");
const base_component_1 = require("@src/ui/base-component");
class WalletScreen extends base_component_1.BaseComponent {
    componentWillUnmount() {
        console.warn('========== WalletScreen componentWillUnmount =========');
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Text, { style: styles.welcome }, "Wallet Screen !"),
            React.createElement(react_native_1.Button, { title: '跳到splash界面', onPress: () => this.props.navigation.navigate(container_1.Contants.ROUTE_LAUNCH_SCREEN) })));
    }
}
exports.WalletScreen = WalletScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
