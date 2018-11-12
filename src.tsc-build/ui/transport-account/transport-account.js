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
const container_1 = require("@src/ui/nav/container");
const impl_1 = require("@src/services/transport-account/impl");
const core_decorators_1 = require("core-decorators");
const components_1 = require("@src/ui/transport-account/components");
const assets_1 = __importDefault(require("@src/main/assets"));
const components_2 = require("@src/ui/components");
const react_native_picker_1 = __importDefault(require("react-native-picker"));
const mobx_react_1 = require("mobx-react");
function emptyclassfyStatVO() {
    return {
        classify: '',
        classifyId: '',
        classifyType: -1,
        consumptionMoney: '',
        money: '',
        oilMoney: '',
        salaryMoney: '',
        tyreMoney: '',
    };
}
let TransportAccountScreen = class TransportAccountScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.locationY = 0;
        this.classifyStatType = 1;
        this.transitInfoStatService = new impl_1.TransitInfoStatServiceImpl(this.props.appStore.app.webService, this.props.appStore.app.env);
        const date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        if (month <= 0) {
            month = 12;
            year = year - 1;
        }
        this.state = {
            transitInfoStat: {
                goodsTypeCount: 0,
                transitTimes: 0,
                truckCount: 0,
                classfyStatVOList: [emptyclassfyStatVO()]
            },
            chooseDate: [year, month],
            showFloatingBar: false
        };
    }
    componentDidMount() {
        this.getTransitInfoStat();
    }
    componentWillUnmount() {
        react_native_picker_1.default.hide();
    }
    getTransitInfoStat() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                beginDate: this.state.chooseDate[0] + '-' + this.state.chooseDate[1],
                classifyStatType: this.classifyStatType,
                endDate: this.state.chooseDate[0] + '-' + this.state.chooseDate[1],
                userId: this.props.appStore.app.userId,
            };
            const result = yield this.transitInfoStatService.getTransitInfoStat(params);
            if (result.success) {
                let list = [emptyclassfyStatVO()];
                if (result.body.classfyStatVOList) {
                    list = list.concat(result.body.classfyStatVOList);
                }
                result.body.classfyStatVOList = list;
                this.setState({ transitInfoStat: result.body });
            }
        });
    }
    render() {
        const list = this.state.transitInfoStat.classfyStatVOList ?
            this.state.transitInfoStat.classfyStatVOList : [emptyclassfyStatVO()];
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: header_1.backToNative, middleView: this.headerMiddView() }),
            React.createElement(react_native_1.FlatList, { data: list, ListHeaderComponent: this.flatListHeader, renderItem: ({ item }) => this.renderItem(item), keyExtractor: (item, index) => item.classifyId + index, stickyHeaderIndices: [1] })));
    }
    flatListHeader() {
        return (React.createElement(react_native_1.View, null,
            React.createElement(components_1.ConsumptionItem, { itemStyle: styles.total, title: '总运费', money: this.state.transitInfoStat.totalMoney, titleStyle: styles.title, moneyStyle: styles.title }),
            React.createElement(components_1.ConsumptionItem, { imageUri: assets_1.default.chezhu.cash, title: '现金', money: this.state.transitInfoStat.totalSalaryMoney }),
            React.createElement(components_1.ConsumptionItem, { imageUri: assets_1.default.chezhu.consumption, title: '消费', money: this.state.transitInfoStat.totalConsumptionMoney }),
            React.createElement(components_1.ConsumptionItem, { imageUri: assets_1.default.chezhu.tyre, title: '轮胎', money: this.state.transitInfoStat.totalTyreMoney }),
            React.createElement(components_1.ConsumptionItem, { imageUri: assets_1.default.chezhu.oil_card, title: '油卡', money: this.state.transitInfoStat.totalOilMoney }),
            React.createElement(react_native_1.Text, { style: styles.thisMonth }, "\u672C\u6708\u7EDF\u8BA1"),
            React.createElement(components_1.DescriptionItem, { items: [
                    { title: '运输车次', content: this.state.transitInfoStat.transitTimes + '车' },
                    { title: '运输重量', content: (this.state.transitInfoStat.totalWeight ? this.state.transitInfoStat.totalWeight : 0) + '吨' },
                    { title: '运输车辆', content: this.state.transitInfoStat.truckCount + '辆' },
                    { title: '运输物料', content: this.state.transitInfoStat.goodsTypeCount + '种' },
                ], lineStyle: styles.descriptLine })));
    }
    headerMiddView() {
        const date = `${this.state.chooseDate[0]}年${this.state.chooseDate[1]}月`;
        return (React.createElement(react_native_1.TouchableOpacity, { style: [styles.center, { flexDirection: 'row' }], onPress: this.showDatePicker },
            React.createElement(react_native_1.Text, { style: [styles.selectText, { color: 'white' }] }, date),
            React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.arrow_down, resizeMode: 'contain' })));
    }
    initChooseGroupData() {
        return [
            {
                onPress: () => __awaiter(this, void 0, void 0, function* () {
                    this.classifyStatType = 1;
                    yield this.props.appStore.app.interaction.blockAndWaitFor(this.getTransitInfoStat(), { kind: 2 });
                }),
                text: '按车辆排序',
                beanIndex: 1,
            },
            {
                onPress: () => __awaiter(this, void 0, void 0, function* () {
                    this.classifyStatType = 2;
                    yield this.props.appStore.app.interaction.blockAndWaitFor(this.getTransitInfoStat(), { kind: 2 });
                }),
                text: '按物料排序',
                beanIndex: 2,
            },
        ];
    }
    renderItem(item) {
        if (item.classifyId.trim() === '') {
            return React.createElement(components_2.ChooseGroup, { selectIndex: this.classifyStatType, beanList: this.initChooseGroupData(), selectTextStyle: styles.selectText, unSelectTextStyle: [styles.selectText, { color: '#4f4f4f' }], selectTouchStyle: styles.chooseGroupTouch, style: styles.chooseGroup });
        }
        else {
            const listItemProps = {
                kind: this.classifyStatType,
                title: item.classify,
                total: item.money,
                cashier: item.salaryMoney,
                consumption: item.consumptionMoney,
                tire: item.tyreMoney,
                oilCard: item.oilMoney
            };
            return React.createElement(react_native_1.TouchableOpacity, { onPress: () => this.props.navigation.navigate(container_1.Constants.ROUTE_TRANSPORT_ACCOUNT_DETAILS, {
                    billCycleJsonStr: this.state.transitInfoStat.billCycleJsonStr,
                    classfyStatVO: item,
                    classifyStatType: this.classifyStatType,
                    periodText: this.state.transitInfoStat.period
                }) },
                React.createElement(components_1.ListItem, Object.assign({}, listItemProps)));
        }
    }
    showDatePicker() {
        let year = [];
        let month = [];
        for (let i = 1970; i <= 2050; i++) {
            year.push(i);
        }
        for (let j = 1; j < 13; j++) {
            month.push(j);
        }
        const date = [year, month];
        const pickDate = `${this.state.chooseDate[0]}年${this.state.chooseDate[1]}月`;
        react_native_picker_1.default.init({
            pickerData: date,
            pickerBg: [255, 255, 255, 1],
            pickerRowHeight: 50,
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            pickerTitleText: '请选择时间',
            pickerToolBarBg: [255, 255, 255, 1],
            selectedValue: this.state.chooseDate,
            onPickerConfirm: pickedValue => {
                this.setState({ chooseDate: pickedValue });
                this.getTransitInfoStat();
            },
            onPickerSelect: pickedValue => {
                this.setState({ chooseDate: pickedValue });
            }
        });
        react_native_picker_1.default.show();
    }
};
TransportAccountScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], TransportAccountScreen);
exports.TransportAccountScreen = TransportAccountScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    total: {
        height: 45,
        marginLeft: 0,
        paddingLeft: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    thisMonth: {
        backgroundColor: 'white',
        paddingVertical: 13,
        marginTop: 10,
        marginBottom: 2,
        color: 'black',
        textAlignVertical: 'center',
        fontSize: 16,
        paddingLeft: 15,
    },
    chooseGroup: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 46,
        marginBottom: 1.5,
        justifyContent: 'space-around'
    },
    chooseGroupTouch: {
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    selectText: {
        color: '#ea0000',
        fontSize: 16
    },
    descriptLine: {
        padding: 13,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    position: {
        position: 'absolute',
        top: react_native_1.Platform.select({ ios: 58, android: 50 }),
        left: 0,
        right: 0,
    }
});
