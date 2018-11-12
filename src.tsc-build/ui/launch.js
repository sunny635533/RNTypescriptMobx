"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class LaunchScreen extends base_component_1.BaseComponent {
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                this.props.navigation.navigate(container_1.Contants.ROUTE_MAIN_TAB_NAVIGATOR);
            }, 1000);
        });
    }
    componentWillUnmount() {
    }
    render() {
        console.log('screenProps:' + JSON.stringify(this.props.screenProps));
        return (React.createElement(react_native_1.ImageBackground, { style: {
                width: react_native_1.Dimensions.get('window').width,
                height: react_native_1.Dimensions.get('window').height
            }, resizeMode: 'stretch', source: assets_1.default.chezhu.splash }));
    }
}
exports.LaunchScreen = LaunchScreen;
