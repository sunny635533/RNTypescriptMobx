"use strict";
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
const loading_1 = require("@src/ui/load/loading");
class BlockerOverlayLoading extends React.Component {
    render() {
        let { opts, darkenOverlayOpacity } = this.props;
        opts = opts || {};
        let { text, kind } = opts;
        kind = kind === undefined ? 3 : kind;
        let content = [];
        if (kind & 1) {
            content.push(React.createElement(react_native_1.View, { key: 'darken', style: [styles.overlay, styles.darkBackground, { opacity: darkenOverlayOpacity || 0.3 }] }));
        }
        if (kind & 2) {
            content.push(React.createElement(loading_1.FullscreenLoadingView, { key: 'spinner' }, text && React.createElement(react_native_1.Text, { style: styles.text }, text)));
        }
        return (React.createElement(react_native_1.View, { style: [styles.overlay, { opacity: darkenOverlayOpacity }] }, content));
    }
}
exports.BlockerOverlayLoading = BlockerOverlayLoading;
const styles = react_native_1.StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    darkBackground: {
        backgroundColor: 'black',
    },
    text: {
        marginTop: 10,
        fontSize: 20,
        backgroundColor: 'transparent',
        color: 'white',
    },
});
