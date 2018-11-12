"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const base_component_1 = require("@src/ui/base-component");
const core_decorators_1 = require("core-decorators");
const mobx_react_1 = require("mobx-react");
let RouterMapperScreen = class RouterMapperScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }
    async bootstrapAsync() {
        this.props.navigation.navigate('MyRouteNavigator', {});
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.ActivityIndicator, null),
            React.createElement(react_native_1.StatusBar, { barStyle: 'default' })));
    }
};
RouterMapperScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], RouterMapperScreen);
exports.RouterMapperScreen = RouterMapperScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
