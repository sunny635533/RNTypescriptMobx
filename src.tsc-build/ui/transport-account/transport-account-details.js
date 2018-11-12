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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const base_component_1 = require("@src/ui/base-component");
const header_1 = require("@src/ui/nav/header");
const core_decorators_1 = require("core-decorators");
const components_1 = require("@src/ui/transport-account/components");
const impl_1 = require("@src/services/transport-account/impl");
const mobx_react_1 = require("mobx-react");
let TransportAccountDetailsScreen = class TransportAccountDetailsScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.displayEndToast = true;
        this.transitInfoStatService = new impl_1.TransitInfoStatServiceImpl(this.props.appStore.app.webService, this.props.appStore.app.env);
        this.state = {
            refresh: false,
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getClassifyStatRecordList();
            if (result.success) {
                this.setState({
                    classifyStatRecord: result.body,
                });
            }
        });
    }
    getClassifyStatRecordList() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                billCycleJsonStr: this.params.billCycleJsonStr,
                classifyId: this.params.classfyStatVO.classifyId,
                classifyStatType: this.params.classifyStatType,
                currentPage: this.currentPage,
                pageSize: 10
            };
            const result = yield this.transitInfoStatService.classifyStatRecordList(params);
            return result;
        });
    }
    initClassifyVoData() {
        return [
            {
                title: '现金',
                content: this.params.classfyStatVO.salaryMoney,
                titleStyle: styles.textLightWhite,
                contentStyle: styles.textWhite
            },
            {
                title: '消费',
                content: this.params.classfyStatVO.consumptionMoney,
                titleStyle: styles.textLightWhite,
                contentStyle: styles.textWhite
            },
            {
                title: '轮胎',
                content: this.params.classfyStatVO.tyreMoney,
                titleStyle: styles.textLightWhite,
                contentStyle: styles.textWhite
            },
            {
                title: '油卡',
                content: this.params.classfyStatVO.oilMoney,
                titleStyle: styles.textLightWhite,
                contentStyle: styles.textWhite
            },
        ];
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: () => this.props.navigation.goBack(), middleView: React.createElement(react_native_1.Text, { style: styles.date }, this.params.periodText) }),
            React.createElement(react_native_1.View, { style: styles.consumptionContainer },
                React.createElement(react_native_1.Text, { style: styles.totalTitleText }, "\u603B\u91D1\u989D (\u5143)"),
                React.createElement(react_native_1.Text, { style: [styles.totalTitleText, styles.totalMoney] }, this.params.classfyStatVO.money),
                React.createElement(components_1.DescriptionItem, { items: this.initClassifyVoData(), lineStyle: styles.desStyle })),
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
                }, data: this.state.classifyStatRecord ? this.state.classifyStatRecord.items : [], renderItem: ({ item }) => React.createElement(components_1.StatRecordView, Object.assign({}, item)), keyExtractor: (item) => item.auctionId, onEndReachedThreshold: 0.01, onEndReached: () => {
                    if (this.state.classifyStatRecord && this.state.classifyStatRecord.end) {
                        if (this.displayEndToast) {
                            react_native_1.DeviceEventEmitter.emit('showToast', '已经是最后一页');
                        }
                    }
                    else {
                        this.loadMore();
                    }
                }, refreshing: this.state.refresh, onRefresh: () => this.onRefresh() })));
    }
    loadMore() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentPage = this.currentPage + 1;
            const result = yield this.getClassifyStatRecordList();
            if (result.success) {
                let classifyStatRecord = result.body;
                const addList = this.state.classifyStatRecord.items.concat(classifyStatRecord.items);
                classifyStatRecord.items = addList;
                this.setState({
                    classifyStatRecord,
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
            const result = yield this.getClassifyStatRecordList();
            if (result.success) {
                this.setState({
                    classifyStatRecord: result.body,
                    refresh: false
                });
            }
        });
    }
};
TransportAccountDetailsScreen = __decorate([
    mobx_react_1.inject('appStore'),
    core_decorators_1.autobind
], TransportAccountDetailsScreen);
exports.TransportAccountDetailsScreen = TransportAccountDetailsScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    consumptionContainer: {
        backgroundColor: '#e23f42',
    },
    totalTitleText: {
        fontSize: 14,
        color: '#f0f0f0',
        alignSelf: 'center',
        marginBottom: 10
    },
    totalMoney: {
        fontSize: 33,
        fontWeight: 'bold',
        color: 'white'
    },
    date: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textLightWhite: {
        color: '#f0f0f0'
    },
    textWhite: {
        color: 'white'
    },
    desStyle: {
        borderTopColor: '#bbbbbb',
        borderTopWidth: 1,
        padding: 10,
        marginTop: 8,
        marginHorizontal: 20
    }
});
