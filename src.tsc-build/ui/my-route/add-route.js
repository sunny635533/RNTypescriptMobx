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
const impl_1 = require("@src/services/my-route/impl");
const react_native_picker_1 = __importDefault(require("react-native-picker"));
const util_1 = require("@src/util");
const container_1 = require("@src/ui/nav/container");
const mobx_react_1 = require("mobx-react");
let AddRouteScreen = class AddRouteScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.areaData = [];
        this.goodTypesData = [];
        this.myRouteService = new impl_1.MyRouteServiceImpl(this.props.appStore.app.webService, this.props.appStore.app.userRole, this.props.appStore.app.env);
        this.state = {
            startCity: '选择运输出发地',
            endCity: '选择运输目的地',
            goodType: '不限'
        };
    }
    componentDidMount() {
        this.getCityData();
        this.getGoodTyps();
        console.warn('lang:' + this.props.appStore.states.storage.language +
            '  ,' + this.props.appStore.localStrings.lbl_force_upgrade);
    }
    componentWillUnmount() {
        react_native_picker_1.default.hide();
    }
    async getCityData() {
        const result = await this.props.appStore.app.interaction.blockAndWaitFor(this.myRouteService.getCityInfoList(), { kind: 0 });
        let pArr = [];
        if (result.success) {
            const provinceList = result.body.filter(c => c.level === 1);
            const cityList = result.body.filter(c => c.level === 2);
            const areaList = result.body.filter(c => c.level === 3);
            provinceList.map(item => {
                let cArr = [];
                let _data = {};
                cityList.map(c => {
                    let _city = {};
                    if (c.parentId === item.id) {
                        let aArr = [];
                        areaList.map(a => {
                            if (a.parentId === c.id) {
                                aArr.push(a.name);
                            }
                        });
                        _city = { [c.name]: aArr };
                        cArr.push(_city);
                    }
                });
                _data = { [item.name]: cArr };
                pArr.push(_data);
            });
        }
        this.areaData = pArr;
    }
    async getGoodTyps() {
        const result = await this.props.appStore.app.interaction.blockAndWaitFor(this.myRouteService.getGoodTypesList(), { kind: 0 });
        if (result.success) {
            this.goodTypesData = result.body;
        }
    }
    async addRoute() {
        if (util_1.isEmptyString(this.startCity) || util_1.isEmptyString(this.endCity)) {
            react_native_1.Alert.alert('', '请填写完整的地址信息哦', [{ text: '确定' }]);
            return;
        }
        const goods = this.goodTypesData.find(x => x.value === this.state.goodType);
        const goodsType = goods ? goods.key : -1;
        const params = {
            senderArea: this.startCity,
            recipientArea: this.endCity,
            goodsType: String(goodsType)
        };
        const result = await this.props.appStore.app.interaction.blockAndWaitFor(this.myRouteService.addRoute(params));
        if (result.success) {
            react_native_1.DeviceEventEmitter.emit('showToast', '添加路线成功');
            this.props.navigation.navigate(container_1.Constants.ROUTE_MY_ROUTE);
            this.params.listener.getRouteList();
        }
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: () => this.props.navigation.goBack(), title: '我的路线' }),
            React.createElement(AddRouteItem, { imageUri: assets_1.default.chezhu.start_city, title: '出发地', description: this.state.startCity, action: () => this.showPicker(0) }),
            React.createElement(AddRouteItem, { imageUri: assets_1.default.chezhu.end_city, title: '目的地', description: this.state.endCity, action: () => this.showPicker(1) }),
            React.createElement(AddRouteItem, { imageUri: assets_1.default.chezhu.common_goods, title: '常运货品', description: this.state.goodType, action: () => this.showPicker(2) }),
            React.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.7, onPress: this.addRoute, style: styles.okButton },
                React.createElement(react_native_1.Text, { style: styles.ok }, "\u786E\u5B9A"))));
    }
    showPicker(kind) {
        let data = [];
        if (kind < 2) {
            data = this.areaData;
        }
        else {
            data = this.goodTypesData.map(x => x.value);
        }
        if (data.length <= 0) {
            react_native_1.DeviceEventEmitter.emit('showToast', '无相关数据，请检查网络是否正常');
            return;
        }
        react_native_picker_1.default.init({
            pickerData: data,
            pickerBg: [255, 255, 255, 1],
            pickerRowHeight: 50,
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '',
            pickerToolBarBg: [255, 255, 255, 1],
            onPickerConfirm: pickedValue => {
                const value = pickedValue.toString().replace(',', '').replace(',', '');
                switch (kind) {
                    case 0:
                        this.setState({ startCity: value });
                        this.startCity = pickedValue.toString().replace(',', '-').replace(',', '-');
                        break;
                    case 1:
                        this.setState({ endCity: value });
                        this.endCity = pickedValue.toString().replace(',', '-').replace(',', '-');
                        break;
                    case 2:
                        this.setState({ goodType: value });
                        break;
                }
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('area', pickedValue);
            }
        });
        react_native_picker_1.default.show();
    }
};
AddRouteScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], AddRouteScreen);
exports.AddRouteScreen = AddRouteScreen;
function AddRouteItem(props) {
    return (React.createElement(react_native_1.TouchableOpacity, { style: styles.addRouteItem, activeOpacity: 0.7, onPress: props.action },
        React.createElement(react_native_1.Image, { source: props.imageUri, style: styles.image }),
        React.createElement(react_native_1.Text, { style: styles.title }, props.title),
        React.createElement(react_native_1.Text, { style: [styles.description, styles.flex], lineBreakMode: 'tail', numberOfLines: 1 }, props.description),
        React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.item_right_arrow, style: styles.image })));
}
exports.AddRouteItem = AddRouteItem;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
    },
    addRouteItem: {
        flexDirection: 'row',
        height: 53,
        backgroundColor: 'white',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    image: {
        height: 33,
        resizeMode: 'contain',
    },
    title: {
        marginLeft: 6,
        fontSize: 16,
        color: '#444444'
    },
    description: {
        marginLeft: 6,
        fontSize: 16,
        color: '#aaaaaa'
    },
    ok: {
        fontSize: 20,
        paddingVertical: 11,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    okButton: {
        backgroundColor: '#e23f42',
        borderRadius: 5,
        width: 300,
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center',
    }
});
