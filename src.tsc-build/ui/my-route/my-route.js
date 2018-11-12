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
const container_1 = require("@src/ui/nav/container");
const impl_1 = require("@src/services/my-route/impl");
const colors_1 = require("@src/ui/colors");
const core_decorators_1 = require("core-decorators");
const components_1 = require("@src/ui/my-route/components");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const app_context_1 = __importDefault(require("@src/mobx/app-context"));
let MyRouteScreen = class MyRouteScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.deleteRouteId = '';
        this.routeList = [];
        this.showDeleteModal = false;
        this.myRouteService = new impl_1.MyRouteServiceImpl(app_context_1.default.app.webService, app_context_1.default.app.userRole, app_context_1.default.app.env);
    }
    get routList() {
        return this.routeList;
    }
    set routList(list) {
        this.routeList = list;
    }
    get getShowDeleteModal() {
        return this.showDeleteModal;
    }
    set setShowDeleteModal(visible) {
        this.showDeleteModal = visible;
    }
    async componentDidMount() {
        console.warn('lang:' + this.props.appStore.states.storage.language +
            '  ,' + this.props.appStore.localStrings.lbl_force_upgrade);
        await this.props.appStore.changedStoreLang('cn');
        this.getRouteList();
    }
    async getRouteList() {
        const result = await this.props.appStore.app.interaction.blockAndWaitFor(this.myRouteService.getRouteList(), { kind: 0 });
        if (result.success) {
            const myRouteList = result.body;
            if (myRouteList && myRouteList.length > 0) {
                this.routeList = myRouteList;
            }
        }
    }
    async deleteRoute(id) {
        const result = await this.props.appStore.app.interaction.blockAndWaitFor(this.myRouteService.deleteRoute({ id }), { kind: 2 });
        if (result.success) {
            const delteRouteIndex = this.routeList.findIndex(r => r.id === id);
            this.routeList.splice(delteRouteIndex, 1);
            if (this.routeList.length <= 0) {
                this.routeList = [];
            }
        }
        this.showDeleteModal = false;
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: header_1.backToNative, title: '我的路线', rightButtons: [{
                        action: () => this.props.navigation.navigate(container_1.Constants.ROUTE_ADD_ROUTE, { listener: this }),
                        title: '添加'
                    }] }),
            this.getRouteListView(),
            this.deleteModal()));
    }
    getRouteListView() {
        if (this.routeList.length <= 0) {
            return React.createElement(components_1.EmptyRouteView, { addRoute: () => { this.props.navigation.navigate(container_1.Constants.ROUTE_ADD_ROUTE, { listener: this }); } });
        }
        else {
            return React.createElement(react_native_1.FlatList, { style: { flex: 1, paddingTop: 10 }, contentContainerStyle: {}, data: this.routeList, renderItem: this.renderItem, keyExtractor: (item) => item.id, horizontal: false });
        }
    }
    renderItem(info) {
        const route = info.item;
        return (React.createElement(react_native_1.TouchableOpacity, { key: route.id, style: styles.renderRow, activeOpacity: 0.7, onLongPress: () => {
                this.showDeleteModal = true;
                this.deleteRouteId = route.id;
            } },
            React.createElement(react_native_1.View, { style: styles.greenLine }),
            this.renderAdddress(route.senderCity, route.senderDistrict),
            React.createElement(react_native_1.View, { style: styles.grayLineContainer },
                React.createElement(react_native_1.View, { style: styles.grayLine })),
            this.renderAdddress(route.recipientCity, route.recipientDistrict),
            React.createElement(react_native_1.Text, { style: styles.goodsName }, route.goodsTypeName)));
    }
    renderAdddress(city, district) {
        return (React.createElement(react_native_1.View, null,
            React.createElement(react_native_1.Text, { style: styles.city }, city),
            React.createElement(react_native_1.Text, { style: styles.district }, district)));
    }
    deleteModal() {
        return React.createElement(react_native_1.Modal, { transparent: true, visible: this.showDeleteModal, onRequestClose: () => { } },
            React.createElement(react_native_1.TouchableOpacity, { style: styles.modalBg, onPress: () => {
                    this.showDeleteModal = false;
                } },
                React.createElement(react_native_1.View, null,
                    this.renderDeleteItem('确定要删除路线吗？', undefined, { fontSize: 16 }, { marginBottom: 1 }),
                    this.renderDeleteItem('确定', () => { this.deleteRoute(this.deleteRouteId); }, { color: 'black' }, { marginBottom: 5 }),
                    this.renderDeleteItem('取消', () => {
                        this.showDeleteModal = false;
                    }, { color: 'red' }))));
    }
    renderDeleteItem(title, action, titleStyle, touchStyle) {
        return (React.createElement(react_native_1.TouchableOpacity, { style: [styles.deleteItem, touchStyle], onPress: action },
            React.createElement(react_native_1.Text, { style: [styles.deleteItemText, titleStyle] }, title)));
    }
};
__decorate([
    mobx_1.observable
], MyRouteScreen.prototype, "routeList", void 0);
__decorate([
    mobx_1.observable
], MyRouteScreen.prototype, "showDeleteModal", void 0);
__decorate([
    mobx_1.action
], MyRouteScreen.prototype, "getRouteList", null);
__decorate([
    mobx_1.action
], MyRouteScreen.prototype, "deleteRoute", null);
MyRouteScreen = __decorate([
    mobx_react_1.inject('appStore'),
    mobx_react_1.observer,
    core_decorators_1.autobind
], MyRouteScreen);
exports.MyRouteScreen = MyRouteScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
    },
    renderRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    greenLine: {
        width: 4,
        height: 55,
        backgroundColor: colors_1.ThemeRed.GLightGreen,
        marginRight: 10,
    },
    city: {
        color: '#333333',
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center'
    },
    district: {
        color: '#666666',
        fontSize: 12,
        textAlign: 'center'
    },
    grayLineContainer: {
        flex: 1,
        alignItems: 'center'
    },
    grayLine: {
        width: 30,
        height: 1,
        backgroundColor: '#aaaaaa'
    },
    goodsName: {
        flex: 2,
        fontSize: 18,
        color: '#333333',
        textAlign: 'center'
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'flex-end'
    },
    deleteItem: {
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteItemText: {
        fontSize: 18,
        color: '#999999',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});
