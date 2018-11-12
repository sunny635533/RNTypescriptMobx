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
const assets_1 = __importDefault(require("@src/main/assets"));
const core_decorators_1 = require("core-decorators");
const container_1 = require("@src/ui/nav/container");
const components_1 = require("@src/ui/components");
const colors_1 = require("@src/ui/colors");
const components_2 = require("@src/ui/car-mall/components");
const impl_1 = require("@src/services/car-mall/impl");
const util_1 = require("@src/util");
const moment_1 = __importDefault(require("moment"));
const native_modules_1 = require("@src/util/native-modules");
const react_native_snap_carousel_1 = __importDefault(require("react-native-snap-carousel"));
const mobx_react_1 = require("mobx-react");
const { width, height } = react_native_1.Dimensions.get('window');
let ProductScreen = class ProductScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.payKind = -1;
        this.buyRightNow = false;
        this.state = {
            commentList: [],
            showModal: false,
            chooseText: ['请选择', ' 按金额或升数'],
            carGoods: null
        };
        this.carMallService = new impl_1.CarMallServiceImpl(this.props.appStore.app.webService, this.props.appStore.app.env);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getCarStoreGoodsInfo();
            this.initCommentList();
        });
    }
    componentWillUnmount() {
        this.setState({ showModal: false });
    }
    get carGoods() {
        if (this.state.carGoods) {
            return this.state.carGoods;
        }
        else {
            return Object.assign({});
        }
    }
    getCarStoreGoodsInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.props.appStore.app.interaction.blockAndWaitFor(this.carMallService.getGoods({ id: this.params.id }));
            if (result.success) {
                this.setState({ carGoods: result.body });
            }
        });
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(react_native_1.FlatList, { style: { marginBottom: 50 }, data: this.state.commentList, ListHeaderComponent: () => this.flatHeaderView(), renderItem: this.renderItem, keyExtractor: (item, index) => item.phone + index }),
            this.bottomView(),
            this.chooseModalView()));
    }
    dimissModal() {
        let text = [];
        switch (this.payKind) {
            case 0:
                text = ['已选', ' 按金额加油'];
                break;
            case 1:
                text = ['已选', ' 按升数加油'];
                break;
            default: text = ['请选择', ' 按金额或升数'];
        }
        this.setState({
            showModal: false,
            chooseText: text
        });
        if (this.buyRightNow) {
            this.goToPayScreeen();
        }
    }
    flatHeaderView() {
        let commentTitle = '';
        if (util_1.isEmptyString(this.carGoods.evaUserId)) {
            commentTitle = '暂无用户评价';
        }
        else {
            commentTitle = '用户评价';
        }
        const priceUnit = '/' + this.carGoods.priceUnit;
        let content = '';
        switch (this.carGoods.type) {
            case 0:
                content = '油站价 ￥';
                break;
            default: content = '原价 ￥';
        }
        content = content + this.carGoods.price + priceUnit;
        let productionProps = {
            storeName: this.carGoods.name,
            oilStationPrice: content,
            monthlySales: `销量${this.carGoods.saleNum}单`,
            redLionSelfEmployed: this.carGoods.hsSelfOperated
        };
        if (this.carGoods.hsExclusive) {
            productionProps = Object.assign(productionProps, {
                price: `￥${this.carGoods.hsPrice}${priceUnit}`,
                redLionExclusive: this.carGoods.hsExclusive
            });
        }
        return React.createElement(react_native_1.View, null,
            this.renderToolBar(),
            React.createElement(components_2.ProductDescription, Object.assign({}, productionProps)),
            React.createElement(react_native_1.TouchableOpacity, { style: styles.prodDetailView, onPress: () => this.props.navigation.navigate(container_1.Constants.ROUTE_PRODUCT_DETAIL, {
                    imageUri: this.carGoods.detailPhoto,
                    description: this.carGoods.detailDesc
                }) },
                React.createElement(react_native_1.Text, { style: styles.greatGrayText }, "\u5546\u54C1\u8BE6\u60C5"),
                React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.item_right_arrow, style: styles.moreDetailImage })),
            this.renderOilKindView(),
            React.createElement(react_native_1.View, { style: [styles.prodDetailView, { marginVertical: 0 }] },
                React.createElement(react_native_1.Text, { style: styles.greatGrayText }, commentTitle)));
    }
    renderOilKindView() {
        if (this.carGoods.type === 0) {
            return (React.createElement(react_native_1.TouchableOpacity, { style: styles.prodDetailView, onPress: () => this.setState({ showModal: true }) },
                React.createElement(react_native_1.Text, { style: styles.greatGrayText },
                    React.createElement(react_native_1.Text, { style: { color: colors_1.ThemeGray.GLightGray } }, this.state.chooseText[0]),
                    this.state.chooseText[1]),
                React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.item_right_arrow, style: styles.moreDetailImage })));
        }
        else {
            return undefined;
        }
    }
    renderToolBar() {
        const statusBar = react_native_1.Platform.OS === 'android' ? React.createElement(react_native_1.StatusBar, { backgroundColor: 'transparent', barStyle: 'light-content', translucent: true }) : undefined;
        return React.createElement(react_native_1.View, null,
            statusBar,
            React.createElement(react_native_snap_carousel_1.default, { containerCustomStyle: { height: 200 }, data: this.carGoods.photo ? this.carGoods.photo : [], renderItem: (item) => {
                    return React.createElement(react_native_1.Image, { source: util_1.getHttpImageWithSize(item.item, 1500, 750), style: styles.productImage });
                }, sliderWidth: width, sliderHeight: 200, itemWidth: width, itemHeight: 200 }),
            React.createElement(components_1.TouchImageWithText, { imageStyle: styles.backGrayImage, imageUri: assets_1.default.chezhu.back_gray, touchStyle: [styles.backImage, { position: 'absolute' }], onPress: () => this.props.navigation.goBack() }));
    }
    renderItem(info) {
        const item = info.item;
        return React.createElement(components_2.CommentView, Object.assign({}, item));
    }
    bottomView() {
        return React.createElement(react_native_1.View, { style: styles.bottomView },
            React.createElement(components_1.TouchImageWithText, { text: '电话', onPress: () => util_1.telephoneLink(this.params.phone), imageUri: assets_1.default.chezhu.call_gray, touchStyle: [styles.callView, styles.rightLine], textStyle: styles.marginThird }),
            React.createElement(components_1.TouchImageWithText, { text: '导航', onPress: () => {
                    native_modules_1.loadNativeBridge().navigateToMap(Number(this.params.lat), Number(this.params.lng), this.params.address);
                }, imageUri: assets_1.default.chezhu.daohang_gray, touchStyle: styles.callView, textStyle: styles.marginThird }),
            React.createElement(components_1.TouchImageWithText, { text: '立即购买', onPress: this.buyNow, textStyle: styles.buyText, touchStyle: styles.buyNow }));
    }
    initChooseList() {
        const beanList = ['按金额加油', '按升数加油'].map((x) => {
            return {
                onPress: (index) => this.payKind = index,
                imageUri: assets_1.default.chezhu.checkbox_normal,
                selectImageUri: assets_1.default.chezhu.checkbox_select,
                text: x
            };
        });
        return beanList;
    }
    chooseModalView() {
        return React.createElement(react_native_1.Modal, { animationType: 'fade', visible: this.state.showModal, transparent: true, onRequestClose: () => this.dimissModal() },
            React.createElement(react_native_1.TouchableOpacity, { activeOpacity: 1, style: styles.modalBg },
                React.createElement(react_native_1.View, { style: { backgroundColor: 'white' } },
                    React.createElement(react_native_1.View, { style: styles.modalItem },
                        React.createElement(components_1.TouchImageWithText, { imageUri: assets_1.default.chezhu.delete, imageStyle: styles.modalImage, onPress: () => {
                                this.buyRightNow = false;
                                this.dimissModal();
                            }, activeOpacity: 1, touchStyle: { padding: 10 } }),
                        React.createElement(react_native_1.Text, { style: [styles.greatGrayText, { fontSize: 17, flex: 1, }] }, '选择加油方式')),
                    React.createElement(components_1.ChooseGroup, { beanList: this.initChooseList(), selectIndex: this.payKind, unSelectTouchStyle: styles.modalItem, unSelectTextStyle: styles.modalItemTitle, unSelectImageStyle: styles.modalImage, activeOpacity: 1 }),
                    React.createElement(components_1.TouchImageWithText, { text: '确定', onPress: () => {
                            if (this.payKind <= -1) {
                                react_native_1.Alert.alert('', '请选择加油方式', [{ text: '确定' }]);
                            }
                            else {
                                this.dimissModal();
                            }
                        }, textStyle: { fontSize: 17, color: 'white' }, touchStyle: styles.modalButton }))));
    }
    initCommentList() {
        if (!util_1.isEmptyString(this.carGoods.evaUserId)) {
            let commentList = [];
            const date = moment_1.default(this.carGoods.evaDateTime).format('YYYY-MM-DD HH:mm');
            const length = this.carGoods.evaUserId.length - 1;
            const phone = `${this.carGoods.evaUserId[0]}***${this.carGoods.evaUserId[length]}`;
            const comment = {
                phone: phone,
                headerImage: util_1.getHttpImageWithSize(this.carGoods.evaUserPhoto, 350, 350, assets_1.default.chezhu.default_login),
                production: date + ' ' + this.carGoods.evaPayTypeText,
                comment: util_1.isEmptyString(this.carGoods.evaDesc) ? '用户未写评论' : this.carGoods.evaDesc,
                ratingCount: this.carGoods.evaScore
            };
            commentList.push(comment);
            this.setState({ commentList });
        }
    }
    buyNow() {
        if (this.carGoods.type !== 0) {
            this.goToPayScreeen();
        }
        else {
            if (this.payKind < 0) {
                this.buyRightNow = true;
                this.setState({ showModal: true });
                return;
            }
            this.goToPayScreeen();
        }
    }
    goToPayScreeen() {
        this.buyRightNow = false;
        this.props.navigation.navigate(container_1.Constants.ROUTE_PAYOILFEE, {
            carGoods: this.carGoods,
            payKind: this.payKind,
            supplierUserId: this.params.supplierUserId,
            storeName: this.params.storeName
        });
    }
};
ProductScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], ProductScreen);
exports.ProductScreen = ProductScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    productImage: {
        width,
        height: 200,
        resizeMode: 'cover'
    },
    bottomView: {
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors_1.ThemeGray.GLineGray,
        backgroundColor: 'white',
        padding: 5,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    prodDetailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 9,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    backImage: {
        marginTop: 30,
        padding: 10,
    },
    backGrayImage: {
        width: 60,
        resizeMode: 'contain'
    },
    bgImage: {
        width,
        height: 200,
        alignItems: 'flex-start'
    },
    greatGrayText: {
        color: colors_1.ThemeGray.GGreatGray,
        fontSize: 15,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    moreDetailImage: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
    buyNow: {
        flex: 1,
        borderRadius: 5,
        paddingVertical: 8,
        marginHorizontal: 10,
        backgroundColor: colors_1.ThemeRed.GNavBgColor,
    },
    buyText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
    },
    callView: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    rightLine: {
        borderRightWidth: 1,
        borderRightColor: colors_1.ThemeGray.GLineGray,
    },
    marginThird: {
        marginLeft: 3
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    modalImage: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    modalItemTitle: {
        flex: 1,
        fontSize: 15,
        color: colors_1.ThemeGray.GGreatGray
    },
    modalItem: {
        flexDirection: 'row-reverse',
        height: 55,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors_1.ThemeGray.GLineGray,
        paddingHorizontal: 15
    },
    modalButton: {
        borderRadius: 10,
        backgroundColor: colors_1.ThemeRed.GNavBgColor,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 70,
        marginBottom: 10
    },
});
