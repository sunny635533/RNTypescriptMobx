"use strict";
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
const assets_1 = __importDefault(require("@src/main/assets"));
function EmptyRouteView(props) {
    return (React.createElement(react_native_1.View, { style: styles.emptyContainer },
        React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.empty, style: styles.empytImage }),
        React.createElement(react_native_1.Text, { style: styles.emptyTitle }, "\u6682\u65E0\u8DEF\u7EBF\u6D88\u606F"),
        React.createElement(react_native_1.Text, { style: styles.emptyDescription }, "\u6DFB\u52A0\u8DEF\u7EBF\uFF0C\u5C06\u6709\u66F4\u591A\u8FD0\u8F93\u673A\u4F1A\u54E6"),
        React.createElement(react_native_1.TouchableOpacity, { onPress: props.addRoute, style: styles.addRouteButton },
            React.createElement(react_native_1.Text, { style: styles.emptyAddRoute }, "\u6DFB\u52A0\u8DEF\u7EBF"))));
}
exports.EmptyRouteView = EmptyRouteView;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    empytImage: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        marginTop: 50,
        marginBottom: 20
    },
    emptyTitle: {
        fontSize: 20,
    },
    emptyDescription: {
        color: '#999999',
        marginTop: 12,
        marginBottom: 25
    },
    addRouteButton: {
        borderRadius: 5,
        backgroundColor: '#e23f42',
        width: 300,
    },
    emptyAddRoute: {
        fontSize: 20,
        paddingVertical: 11,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
