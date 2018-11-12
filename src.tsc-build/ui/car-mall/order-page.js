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
const components_1 = require("@src/ui/components");
const colors_1 = require("@src/ui/colors");
const components_2 = require("@src/ui/car-mall/components");
const impl_1 = require("@src/services/car-mall/impl");
const native_modules_1 = require("@src/util/native-modules");
const container_1 = require("@src/ui/nav/container");
const util_1 = require("@src/util");
const mobx_react_1 = require("mobx-react");
const { width, height } = react_native_1.Dimensions.get('window');
const ReactEventEmit = react_native_1.NativeModules.ReactEventEmit;
const myReactEventEmit = new react_native_1.NativeEventEmitter(ReactEventEmit);
let PayOilFeeScreen = class PayOilFeeScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            oilCount: this.isOilProduct() ? '' : '1',
            disabled: false,
        };
        this.carMallService = new impl_1.CarMallServiceImpl(this.props.appStore.app.webService, this.props.appStore.app.env);
    }
    componentDidMount() {
        if (react_native_1.Platform.OS === 'ios') {
            this.listener = myReactEventEmit.addListener('goToCashier', (data) => {
                console.warn('====== cashierSuccess ======= ' + JSON.stringify(data));
                this.process(data.result);
            });
        }
    }
    componentWillUnmount() {
        this.listener && this.listener.remove();
    }
    isOilProduct() {
        return this.params.carGoods.type === 0;
    }
    getRealPrice() {
        return this.params.carGoods.hsExclusive ? this.params.carGoods.hsPrice : this.params.carGoods.price;
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: () => this.props.navigation.goBack(), title: this.isOilProduct() ? '付油费' : '订单确认', showTransparentBar: true }),
            React.createElement(react_native_1.View, { style: styles.topView },
                React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.sd, style: styles.storeImage }),
                React.createElement(react_native_1.Text, { style: [styles.descript, { fontSize: 18 }], numberOfLines: 1, lineBreakMode: 'tail' }, this.params.storeName)),
            React.createElement(components_2.PayProductItem, { imageUri: this.params.carGoods.photo ? util_1.getHttpImageWithSize(this.params.carGoods.photo[0]) : { uri: '' }, title: this.params.carGoods.name, price: '￥' + this.getRealPrice(), unit: '/' + this.params.carGoods.priceUnit, count: this.isOilProduct() ? '' : 'x ' + this.state.oilCount }),
            this.showInputView(),
            React.createElement(react_native_1.TouchableOpacity, { onPress: () => this.props.navigation.navigate(container_1.Constants.ROUTE_WEBVIEW, {
                    url: 'http://cz.redlion56.com/app/fillup.html',
                    title: '红狮物流加油服务协议'
                }), activeOpacity: 1, style: { marginTop: 25, paddingVertical: 3 } },
                React.createElement(react_native_1.Text, { style: styles.read },
                    "\u5DF2\u9605\u8BFB\u5E76\u540C\u610F",
                    React.createElement(react_native_1.Text, { style: { color: colors_1.ThemeBlue.GGreatBlue } }, "\u300A\u7EA2\u72EE\u7269\u6D41\u52A0\u6CB9\u670D\u52A1\u534F\u8BAE\u300B"))),
            React.createElement(react_native_1.View, { style: styles.flex }),
            this.renderBottomView()));
    }
    renderOffer(title, money) {
        return React.createElement(react_native_1.View, { style: styles.itemWhiteBg },
            React.createElement(react_native_1.Text, { style: styles.descript }, title),
            React.createElement(react_native_1.Text, { style: styles.redMoney }, money));
    }
    renderBottomView() {
        const totalMoney = this.params.payKind !== 0 ? Number(this.state.oilCount) * this.getRealPrice()
            : Number(this.state.oilCount);
        return (React.createElement(react_native_1.View, { style: [styles.itemWhiteBg, styles.bottomView] },
            React.createElement(react_native_1.Text, { style: styles.descript },
                "\u5408\u8BA1\u91D1\u989D\uFF1A",
                React.createElement(react_native_1.Text, { style: styles.redMoney, numberOfLines: 1, lineBreakMode: 'tail' },
                    "\uFFE5",
                    totalMoney.toFixed(2))),
            React.createElement(components_1.TouchImageWithText, { text: '立即支付', onPress: this.paySubmit, textStyle: [styles.descript, { color: 'white' }], touchStyle: styles.payButton, disabled: this.state.disabled })));
    }
    showInputView() {
        let texts = [];
        if (this.isOilProduct()) {
            if (this.params.payKind === 0) {
                texts[0] = '请输入加油金额';
                texts[1] = '加油金额';
                texts[2] = '￥';
            }
            else {
                texts[0] = '请输入加油升数';
                texts[1] = '加油升数';
                texts[2] = 'L';
            }
            return React.createElement(components_2.InputView, { ref: (inputRef) => this.inputViewRef = inputRef, placeholder: texts[0], title: texts[1], identifier: texts[2], value: this.state.oilCount, changedText: this.changedNumberText });
        }
        else {
            return (React.createElement(components_2.CountView, { getCount: (count) => this.setState({ oilCount: String(count) }) }));
        }
    }
    iosInputAlert(text) {
        if (react_native_1.Platform.OS === 'ios') {
            react_native_1.Alert.alert('', text, [{ text: '确定' }]);
        }
    }
    changedNumberText(text) {
        text = text.trim();
        let newText = '';
        let numbers = '0123456789.';
        if (text.length < 1 || (text.indexOf('.') === 0)) {
            this.setState({ oilCount: '' });
            this.inputViewRef.changedText();
            if (text.indexOf('.') === 0) {
                this.iosInputAlert('请输入正确的数字');
            }
            return;
        }
        if (Number(text) > 9999999.99) {
            this.setState({ oilCount: '9999999.99' });
            this.inputViewRef.changedText();
            this.iosInputAlert('最大的数字不超过9999999.99');
            return;
        }
        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        if (newText.split('.').length > 2) {
            newText = newText.substring(0, newText.lastIndexOf('.'));
            this.iosInputAlert('请输入正确的数字');
        }
        if (newText.length >= 2 && newText[0] === '0' && newText[1] !== '.') {
            newText = newText.substring(1);
        }
        const pos_decimal = newText.indexOf('.');
        if (pos_decimal > -1 && (newText.length - 1 >= pos_decimal + 3)) {
            newText = newText.substring(0, pos_decimal + 3);
            this.iosInputAlert('请输入小数点后两位');
        }
        this.setState({ oilCount: newText });
        this.inputViewRef.changedText();
    }
    paySubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ disabled: true });
            let totalMoney = 0;
            let amount = 0;
            if (this.isOilProduct()) {
                const alertText = this.params.payKind === 1 ? '请输入升数' : '请输入金额';
                if (util_1.isEmptyString(this.state.oilCount)) {
                    react_native_1.Alert.alert('', alertText, [{ text: '确定', onPress: () => this.setState({ disabled: false }) }]);
                    return;
                }
                if (this.params.payKind === 1) {
                    totalMoney = 0;
                    amount = Number(this.state.oilCount);
                }
                else {
                    totalMoney = Number(this.state.oilCount);
                    amount = 0;
                }
            }
            else {
                totalMoney = Number((Number(this.state.oilCount) * this.getRealPrice()).toFixed(2));
                amount = Number(this.state.oilCount);
            }
            const params = {
                payeeUid: this.params.supplierUserId,
                goodsId: this.params.carGoods.id,
                amount: amount,
                price: this.getRealPrice(),
                totalMoney: totalMoney,
                tradeType: this.params.carGoods.type === 0 ? 4 : 5,
                discount: 0,
                decrease: 0,
                freight: 0,
                goodsName: this.params.carGoods.name
            };
            try {
                const result = yield this.props.appStore.app.interaction.blockAndWaitFor(this.carMallService.submit(params));
                console.warn('=======submit===== ' + JSON.stringify(result) + ' ,allPayType=' + (this.params.carGoods.allPayType) + ',default:' + this.params.carGoods.defaultPayType);
                if (result.success && result.body) {
                    const payRequest = {
                        partnerId: '红狮物流',
                        tradeName: result.body.productName + '商品支付',
                        outerId: result.body.id,
                        amount: result.body.totalMoney,
                        moneyUnitCode: 'CNY_YUAN',
                        payeeUid: result.body.payeeCifUid,
                        payTypes: this.params.carGoods.allPayType,
                        consumeType: 'SHOPPING',
                        defaultPayType: this.params.carGoods.defaultPayType
                    };
                    native_modules_1.loadNativeBridge().goToCashier(JSON.stringify(payRequest)).then((result) => {
                        if (react_native_1.Platform.OS === 'android') {
                            this.process(result);
                        }
                    }).catch(() => {
                        if (react_native_1.Platform.OS === 'android') {
                            this.process();
                        }
                    });
                }
                else {
                    if (react_native_1.Platform.OS === 'ios') {
                        react_native_1.DeviceEventEmitter.emit('showToast', result.errMsg);
                    }
                }
            }
            catch (e) {
                console.log('==== paySubmit method ,exception:' + e);
            }
            finally {
                this.setBuyButtonDisable();
            }
        });
    }
    setBuyButtonDisable() {
        setTimeout(() => {
            this.setState({ disabled: false });
        }, 1000);
    }
    process(result) {
        if (result === 'success') {
            setTimeout(() => {
                react_native_1.Alert.alert('', '支付成功', [{
                        text: '确定', onPress: () => {
                            this.props.navigation.navigate(container_1.Constants.ROUTE_STORE);
                        }
                    }], { cancelable: false });
            }, 500);
        }
        else {
            setTimeout(() => {
                react_native_1.Alert.alert('支付失败', '', [{ text: '确定' }], { cancelable: false });
            }, 500);
        }
    }
};
PayOilFeeScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], PayOilFeeScreen);
exports.PayOilFeeScreen = PayOilFeeScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    flexDirectionRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topView: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    itemWhiteBg: {
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
    },
    descript: {
        fontSize: 17,
        color: colors_1.ThemeGray.GGreatGray,
        textAlignVertical: 'center',
    },
    redMoney: {
        fontSize: 20,
        color: colors_1.ThemeRed.GNavBgColor,
    },
    storeImage: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 6
    },
    read: {
        marginLeft: 13,
        fontSize: 15,
        color: colors_1.ThemeGray.GGreatGray
    },
    bottomView: {
        width,
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    payButton: {
        borderRadius: 6,
        backgroundColor: colors_1.ThemeRed.GNavBgColor,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
});
