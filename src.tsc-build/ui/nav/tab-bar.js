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
const react_native_tabbar_view_1 = __importDefault(require("react-native-tabbar-view"));
const NS = __importStar(require("./constant"));
const assets_1 = __importDefault(require("@src/main/assets"));
const core_decorators_1 = require("core-decorators");
const base_component_1 = require("@src/ui/base-component");
const colors_1 = require("@src/ui/colors");
let CustomTabBar = class CustomTabBar extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        const { index, routes } = props.navigation.state;
        this.state = {
            routeName: routes[index].routeName,
        };
    }
    componentWillReceiveProps(newProps) {
        let newNavState = newProps.navigation.state;
        let oldNavState = this.props.navigation.state;
        if (newNavState.index !== oldNavState.index) {
            this.setState({
                routeName: newNavState.routes[newNavState.index].routeName
            });
        }
    }
    updatedTab(routeName) {
        this.props.navigation.navigate(routeName);
        this.setState({
            routeName
        });
    }
    renderItem(routeName, icon, selectedIcon, title, badgeText = 0) {
        return (React.createElement(react_native_tabbar_view_1.default.Item, { selected: this.state.routeName === routeName, title: title, selectedTitleStyle: { color: colors_1.ThemeRed.GTheme }, badgeText: badgeText, renderIcon: () => React.createElement(react_native_1.Image, { source: icon, style: styles.tabIcon }), renderSelectedIcon: () => React.createElement(react_native_1.Image, { source: selectedIcon, style: styles.tabIcon }), onPress: () => {
                this.updatedTab(routeName);
            } }));
    }
    render() {
        return (React.createElement(react_native_tabbar_view_1.default, { tabBarStyle: styles.tabbar },
            this.renderItem(NS.ROUTE_TASK_NAVIGATOR, assets_1.default.chezhu.task, assets_1.default.chezhu.task_press, '任务'),
            this.renderItem(NS.ROUTE_GOODSAPPLY_NAVIGATOR, assets_1.default.chezhu.goods, assets_1.default.chezhu.goods_press, '货源'),
            this.renderItem(NS.ROUTE_HOME_NAVIGATOR, assets_1.default.chezhu.home, assets_1.default.chezhu.home_press, '首页'),
            this.renderItem(NS.ROUTE_MESSAGE_NAVIGATOR, assets_1.default.chezhu.news, assets_1.default.chezhu.news_press, '消息'),
            this.renderItem(NS.ROUTE_WALLET_NAVIGATOR, assets_1.default.chezhu.my_wallet, assets_1.default.chezhu.my_wallet_press, '钱包')));
    }
};
CustomTabBar = __decorate([
    core_decorators_1.autobind
], CustomTabBar);
exports.CustomTabBar = CustomTabBar;
const styles = react_native_1.StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBg: {
        width: react_native_1.Dimensions.get('window').width,
        height: 52
    },
    tabIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    tabbar: {
        width: react_native_1.Dimensions.get('window').width,
        backgroundColor: 'white',
        height: 45,
        paddingBottom: react_native_1.Platform.select({ ios: 0 }),
    },
    liveView: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 3,
    },
    liveIcon: {
        width: 75,
        height: 75,
        resizeMode: 'stretch',
    },
});
