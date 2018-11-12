"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const base_component_1 = require("@src/ui/base-component");
const header_1 = require("@src/ui/nav/header");
const assets_1 = __importDefault(require("@src/main/assets"));
const core_decorators_1 = require("core-decorators");
const container_1 = require("@src/ui/nav/container");
const components_1 = require("@src/ui/car-mall/components");
const colors_1 = require("@src/ui/colors");
const react_native_collapsible_toolbar_1 = __importDefault(require("react-native-collapsible-toolbar"));
const impl_1 = require("@src/services/car-mall/impl");
const util_1 = require("@src/util");
const native_modules_1 = require("@src/util/native-modules");
const util_2 = require("@src/util");
const mobx_react_1 = require("mobx-react");
const { width, height } = react_native_1.Dimensions.get('window');
let StoreScreen = class StoreScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            carStoreInfo: null,
        };
        this.carMallService = new impl_1.CarMallServiceImpl(this.props.appStore.app.webService, this.props.appStore.app.env);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.location = yield native_modules_1.loadNativeBridge().getLocation();
            const lat = Number(this.location.lat) === 0 ? '30.24994301854506' : this.location.lat;
            const lng = Number(this.location.lng) === 0 ? '120.2115205908573' : this.location.lng;
            this.location.lat = lat;
            this.location.lng = lng;
            yield this.getCarStoreInfo();
            if (react_native_1.Platform.OS === 'android' && this.params.fromNative) {
                react_native_1.BackHandler.addEventListener('hardwareBackPress', this.backHandler);
            }
        });
    }
    backHandler() {
        react_native_1.BackHandler.exitApp();
    }
    componentWillUnmount() {
        if (react_native_1.Platform.OS === 'android' && this.params.fromNative) {
            react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
        }
    }
    get carStoreInfo() {
        if (this.state.carStoreInfo) {
            return this.state.carStoreInfo;
        }
        else {
            console.log('error!! carStoreInfo is  -> ' + JSON.stringify(this.state.carStoreInfo));
            return Object.assign({});
        }
    }
    getCarStoreInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.props.appStore.app.interaction.blockAndWaitFor(this.carMallService.getCarStoreInfo({
                lat: this.location.lat,
                lng: this.location.lng,
                id: this.params.id
            }));
            if (result.success && result.body) {
                this.setState({ carStoreInfo: result.body });
            }
        });
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(react_native_collapsible_toolbar_1.default, { renderContent: () => this.getFlatList(), renderNavBar: () => this.renderNavBar(), renderToolBar: () => this.renderToolBar(), collapsedNavBarBackgroundColor: colors_1.ThemeRed.GNavBgColor, translucentStatusBar: react_native_1.Platform.Version >= 21, toolBarHeight: 200 })));
    }
    renderNavBar() {
        return React.createElement(header_1.NavHeaderWithBack, { backAction: () => this.params.fromNative ? header_1.backToNative() : this.props.navigation.goBack(), title: this.carStoreInfo.name, headerStyle: { paddingTop: 0 }, backImage: assets_1.default.chezhu.back });
    }
    renderToolBar() {
        const statusBar = react_native_1.Platform.OS === 'android' ? React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', barStyle: 'light-content', translucent: true }) : undefined;
        return React.createElement(react_native_1.ImageBackground, { resizeMode: 'cover', source: util_2.getHttpImageWithSize(this.carStoreInfo.photo, 1500, 750, assets_1.default.chezhu.default), style: styles.bgImage },
            statusBar,
            React.createElement(react_native_1.TouchableOpacity, { onPress: () => this.params.fromNative ? header_1.backToNative() : this.props.navigation.goBack(), style: { marginTop: 30, padding: 10 } },
                React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.back_gray, style: styles.backGrayImage })));
    }
    getFlatList() {
        return React.createElement(react_native_1.FlatList, { ListHeaderComponent: () => this.renderHeaderView(), data: this.carStoreInfo.carGoodsList, renderItem: (info) => this.renderItem(info.item), keyExtractor: (item, index) => item.id + index });
    }
    renderHeaderView() {
        const address = util_2.getDefaultString(this.carStoreInfo.districtAddress) +
            util_2.getDefaultString(this.carStoreInfo.streetAddress) +
            util_2.getDefaultString(this.carStoreInfo.villageAddress);
        return React.createElement(react_native_1.View, { style: { backgroundColor: '#eeeeee' } },
            React.createElement(components_1.StoreDetailView, { name: this.carStoreInfo.name, storeImageUri: util_2.getHttpImageWithSize(this.carStoreInfo.photo), ratingCount: this.carStoreInfo.score, address: address, distance: this.carStoreInfo.distance, navigateToMap: () => native_modules_1.loadNativeBridge().navigateToMap(Number(this.carStoreInfo.lat), Number(this.carStoreInfo.lng), address + util_2.getDefaultString(this.carStoreInfo.detailArea)), phoneCall: () => util_1.telephoneLink(this.carStoreInfo.contactNumber) }),
            React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.ad, style: styles.adImage }));
    }
    renderItem(item) {
        const priceUnit = '/' + item.priceUnit;
        let content = '';
        switch (item.type) {
            case 0:
                content = '油站价 ￥';
                break;
            default: content = '原价 ￥';
        }
        content = content + item.price + priceUnit;
        const address = util_2.getDefaultString(this.carStoreInfo.districtAddress) + util_2.getDefaultString(this.carStoreInfo.streetAddress) +
            util_2.getDefaultString(this.carStoreInfo.villageAddress) + util_2.getDefaultString(this.carStoreInfo.detailArea);
        const store = {
            thumail: util_2.getHttpImageWithSize(item.photo ? item.photo[0] : ''),
            storeName: item.name,
            content: content,
            monthlySales: '销量' + item.saleNum + '单',
            price: '￥' + item.hsPrice,
            redLionExclusive: item.hsExclusive,
            redLionSelfEmployed: item.hsSelfOperated,
            priceUnit: priceUnit,
            itemClick: () => this.props.navigation.navigate(container_1.Constants.ROUTE_PRODUCT, {
                id: item.id,
                lng: this.carStoreInfo.lng,
                lat: this.carStoreInfo.lat,
                phone: this.carStoreInfo.contactNumber,
                address: address,
                supplierUserId: this.carStoreInfo.supplierUserId,
                storeName: this.carStoreInfo.name
            })
        };
        return (React.createElement(components_1.ProductItem, Object.assign({}, store)));
    }
};
StoreScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], StoreScreen);
exports.StoreScreen = StoreScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    backImage: {
        marginLeft: 10,
        marginTop: 30,
        resizeMode: 'contain'
    },
    bgImage: {
        width,
        height: 200,
    },
    adImage: {
        margin: 12,
        width: width - 24,
        height: 130,
        resizeMode: 'stretch'
    },
    backGrayImage: {
        width: 60,
        resizeMode: 'contain'
    },
});
