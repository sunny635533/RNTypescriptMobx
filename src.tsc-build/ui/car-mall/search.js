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
const colors_1 = require("@src/ui/colors");
const impl_1 = require("@src/services/car-mall/impl");
const util_1 = require("@src/util");
const container_1 = require("@src/ui/nav/container");
const components_1 = require("@src/ui/car-mall/components");
const native_modules_1 = require("@src/util/native-modules");
const mobx_react_1 = require("mobx-react");
let SearchScreen = class SearchScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.end = false;
        this.currentPage = 1;
        this.displayEndToast = true;
        this.supplierName = '';
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
        });
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: () => this.props.navigation.goBack(), title: '搜索', showTransparentBar: true }),
            React.createElement(react_native_1.View, { style: styles.redContainer },
                React.createElement(react_native_1.View, { style: styles.whiteContainer },
                    React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.search, style: styles.image }),
                    React.createElement(react_native_1.TextInput, { style: styles.inputText, placeholderTextColor: '#cccccc', placeholder: '搜索商家', underlineColorAndroid: 'transparent', onChangeText: (text) => {
                            if (react_native_1.Platform.OS === 'android') {
                                this.search(text);
                            }
                        }, onEndEditing: (e) => {
                            if (react_native_1.Platform.OS === 'ios') {
                                this.search(e.nativeEvent.text);
                            }
                        } }))),
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
                }, data: this.state.oilStoreList, renderItem: (info) => this.renderItem(info.item), ListEmptyComponent: this.emptyView, keyExtractor: (item, index) => item.id + index, refreshing: this.state.refresh, onRefresh: () => this.onRefresh(), onEndReachedThreshold: 0.01, onEndReached: () => {
                    if (this.end) {
                        if (this.displayEndToast) {
                            react_native_1.DeviceEventEmitter.emit('showToast', '已经是最后一页');
                        }
                    }
                    else {
                        this.loadMore();
                    }
                } })));
    }
    emptyView() {
        return React.createElement(react_native_1.Text, { style: styles.emptyText }, "\u6682\u65E0\u6570\u636E");
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
        return (React.createElement(components_1.Store, Object.assign({}, store)));
    }
    loadMore() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentPage = this.currentPage + 1;
            const result = yield this.getNearStoreList(this.supplierName);
            if (result.success) {
                this.end = result.body.end;
                const addList = this.state.oilStoreList.concat(result.body.items);
                this.setState({
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
            const result = yield this.getNearStoreList(this.supplierName);
            if (result.success) {
                this.end = result.body.end;
                yield this.setState({
                    oilStoreList: result.body.items,
                    refresh: false
                });
            }
        });
    }
    search(text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (util_1.isEmptyString(text)) {
                return;
            }
            this.currentPage = 1;
            this.supplierName = text;
            const result = yield this.getNearStoreList(this.supplierName);
            if (result.success) {
                this.end = result.body.end;
                this.setState({
                    oilStoreList: result.body.items,
                });
            }
        });
    }
    getNearStoreList(searchName) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                lat: this.location.lat,
                lng: this.location.lng,
                searchType: 0,
                supplierName: searchName,
                currentPage: this.currentPage,
                pageSize: 10,
                desc: 0
            };
            const result = yield this.carMallService.getNearByOilStore(params);
            return result;
        });
    }
};
SearchScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], SearchScreen);
exports.SearchScreen = SearchScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 23,
        height: 23,
        resizeMode: 'stretch',
        marginRight: 6
    },
    inputText: {
        flex: 1,
        fontSize: 17,
        textAlignVertical: 'center',
    },
    emptyText: {
        flex: 1,
        color: colors_1.ThemeGray.GLightGray,
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    redContainer: {
        backgroundColor: colors_1.ThemeRed.GNavBgColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 10,
        height: 46
    }
});
