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
const header_1 = require("@src/ui/nav/header");
const core_decorators_1 = require("core-decorators");
const util_1 = require("@src/util");
const mobx_react_1 = require("mobx-react");
const { width, height } = react_native_1.Dimensions.get('window');
let ProductDetailScreen = class ProductDetailScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: () => this.props.navigation.goBack(), title: '商品详情', showTransparentBar: true }),
            React.createElement(react_native_1.ScrollView, { contentContainerStyle: { alignItems: 'center' } },
                React.createElement(react_native_1.Image, { style: styles.image, source: util_1.getHttpImageWithSize(this.params.imageUri, 1500, 1000) }),
                React.createElement(react_native_1.Text, { style: styles.text }, this.params.description))));
    }
};
ProductDetailScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], ProductDetailScreen);
exports.ProductDetailScreen = ProductDetailScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: width,
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    text: {
        fontSize: 17,
        color: 'black',
        padding: 10,
    }
});
