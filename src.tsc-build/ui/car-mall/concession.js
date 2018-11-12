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
const impl_1 = require("@src/services/car-mall/impl");
const util_1 = require("@src/util");
const container_1 = require("@src/ui/nav/container");
const react_native_snap_carousel_1 = __importDefault(require("react-native-snap-carousel"));
const components_1 = require("@src/ui/components");
const components_2 = require("@src/ui/car-mall/components");
const native_modules_1 = require("@src/util/native-modules");
const mobx_react_1 = require("mobx-react");
const IMGS = [
    assets_1.default.chezhu.ad
];
const { width } = react_native_1.Dimensions.get('window');
let ConcessionScreen = class ConcessionScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.searchType = 1;
        this.displayEndToast = true;
        this.end = false;
        this.currentPage = 0;
        this.state = {
            oilStoreList: [],
            refresh: false
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
            this.loadMore();
        });
    }
    getNearStoreList() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                searchType: this.searchType,
                supplierType: this.params.supplierType ? this.params.supplierType : '',
                currentPage: this.currentPage,
                lat: this.location.lat,
                lng: this.location.lng,
                pageSize: 10,
                desc: this.searchType === 1 ? 1 : 0
            };
            const result = yield this.carMallService.getNearByOilStore(params);
            return result;
        });
    }
    loadMore() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentPage = this.currentPage + 1;
            const result = yield this.getNearStoreList();
            if (result.success) {
                this.end = result.body.end;
                const addList = this.state.oilStoreList.concat(result.body.items);
                yield this.setState({
                    oilStoreList: addList,
                });
            }
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({
                refresh: true
            });
            this.currentPage = 1;
            const result = yield this.getNearStoreList();
            if (result.success) {
                this.end = result.body.end;
                yield this.setState({
                    oilStoreList: result.body.items,
                    refresh: false
                });
            }
        });
    }
    render() {
        const title = this.params.supplierType && this.params.supplierType.includes(',') ? '配件市场' : '优惠加油';
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: header_1.backToNative, title: title, showTransparentBar: true, rightButtons: [{
                        action: () => this.props.navigation.navigate(container_1.Constants.ROUTE_SEARCH),
                        image: assets_1.default.chezhu.search_white,
                        imageStyle: { width: 18, resizeMode: 'contain' },
                    }] }),
            React.createElement(react_native_1.View, { style: styles.viewPaggerContainer },
                React.createElement(react_native_1.View, { style: styles.white }),
                React.createElement(react_native_snap_carousel_1.default, { containerCustomStyle: styles.carousel, data: IMGS, renderItem: this.renderPagerItem, sliderWidth: width, sliderHeight: 150, itemWidth: width - 70, itemHeight: 150, loop: false, autoplay: false, autoplayInterval: 3000 })),
            React.createElement(components_1.ChooseGroup, { selectIndex: this.searchType, beanList: this.initChooseGroupData(), selectTextStyle: styles.selectText, unSelectTextStyle: [styles.selectText, { color: '#4f4f4f' }], selectTouchStyle: styles.chooseGroupTouch, unSelectTouchStyle: styles.flex, style: styles.chooseGroup }),
            React.createElement(react_native_1.FlatList, { onLayout: (event) => {
                    this.flatListHeight = event.nativeEvent.layout.height;
                }, onContentSizeChange: (w, h) => {
                    console.log('======== onContentSizeChange =======w:' + w + ' ,h:' + h + ' ,flatListHeight:' + this.flatListHeight);
                    if (h <= this.flatListHeight) {
                        this.displayEndToast = false;
                    }
                    else {
                        this.displayEndToast = true;
                    }
                }, data: this.state.oilStoreList, renderItem: (info) => this.renderItem(info.item), keyExtractor: (item, index) => item.id + index, onEndReachedThreshold: 0.01, onEndReached: () => {
                    if (this.end) {
                        if (this.displayEndToast) {
                            react_native_1.DeviceEventEmitter.emit('showToast', '已经是最后一页');
                        }
                    }
                    else {
                        this.loadMore();
                    }
                }, refreshing: this.state.refresh, onRefresh: () => this.onRefresh() })));
    }
    renderItem(item) {
        const store = {
            thumail: util_1.getHttpImageWithSize(item.photo),
            storeName: item.name,
            monthlySales: '销量' + item.saleNum + '单',
            star: '评分 ' + Number(item.score).toFixed(1),
            distance: item.distance,
            redLionExclusive: item.hsExclusive,
            redLionSelfEmployed: item.hsSelfOperated,
            itemClick: () => __awaiter(this, void 0, void 0, function* () {
                this.props.navigation.navigate(container_1.Constants.ROUTE_STORE, {
                    id: item.id
                });
            }),
            navigateToMap: () => {
                const address = util_1.getDefaultString(item.provinceAddress) + util_1.getDefaultString(item.cityAddress) +
                    util_1.getDefaultString(item.districtAddress) + util_1.getDefaultString(item.streetAddress) +
                    util_1.getDefaultString(item.villageAddress) + util_1.getDefaultString(item.detailArea);
                native_modules_1.loadNativeBridge().navigateToMap(Number(item.lat), Number(item.lng), address);
            }
        };
        return (React.createElement(components_2.Store, Object.assign({}, store)));
    }
    initChooseGroupData() {
        const titles = ['附近门店', '销量', '评分', '我去过的'];
        const beans = titles.map((title, index) => {
            const bean = {
                onPress: this.tabClick,
                text: title,
                beanIndex: index + 1,
            };
            return bean;
        });
        return beans;
    }
    tabClick(pressIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.appStore.app.interaction.showLoadingView({ kind: 2 });
            try {
                this.searchType = pressIndex;
                this.currentPage = 1;
                this.end = false;
                this.setState({ oilStoreList: [] });
                const result = yield this.getNearStoreList();
                if (result.success) {
                    this.end = result.body.end;
                    yield this.setState({
                        oilStoreList: result.body.items,
                    });
                }
            }
            catch (e) {
                console.warn('tabClick exception :' + e);
            }
            finally {
                yield this.props.appStore.app.interaction.hideLoadingView();
            }
        });
    }
    renderPagerItem(item) {
        return (React.createElement(react_native_1.Image, { source: item.item, style: styles.pager }));
    }
};
ConcessionScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], ConcessionScreen);
exports.ConcessionScreen = ConcessionScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewPaggerContainer: {
        backgroundColor: '#e23f42',
        height: 180,
        justifyContent: 'flex-end'
    },
    white: {
        backgroundColor: 'white',
        height: 50,
    },
    pager: {
        width: width - 70,
        height: 150,
        borderRadius: 10,
        resizeMode: 'stretch'
    },
    carousel: {
        position: 'absolute',
        height: 150,
        top: 15,
        left: 0,
        right: 0,
    },
    chooseGroup: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 46,
        justifyContent: 'space-between',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1.5,
        paddingHorizontal: 10
    },
    chooseGroupTouch: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    selectText: {
        color: '#ea0000',
        fontSize: 16,
        textAlign: 'center'
    },
});
