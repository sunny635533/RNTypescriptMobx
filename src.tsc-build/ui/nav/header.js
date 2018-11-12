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
const Util = __importStar(require("@src/util"));
const colors_1 = require("@src/ui/colors");
async function backToNative() {
    if (react_native_1.Platform.OS === 'ios') {
    }
    else {
        react_native_1.BackHandler.exitApp();
    }
}
exports.backToNative = backToNative;
function createTitle(text, textProps, titleStyle) {
    return (React.createElement(react_native_1.View, { style: styles.title },
        React.createElement(react_native_1.Text, Object.assign({}, textProps, { style: [styles.titleText, titleStyle] }), text)));
}
exports.createTitle = createTitle;
function NavButton(ps) {
    return (React.createElement(react_native_1.View, { style: styles.flexDirectionRow }, ps.buttons.map((button, i) => {
        return (React.createElement(react_native_1.TouchableOpacity, { key: i, onPress: () => button.action(), style: [styles.buttonContainer, button.touchStyle] },
            button.title && React.createElement(react_native_1.Text, { style: [styles.titleText, button.titleStyle] }, button.title),
            button.image && React.createElement(react_native_1.Image, { source: button.image, style: [styles.backImage, button.imageStyle] })));
    })));
}
exports.NavButton = NavButton;
class NavHeaderWithBack extends React.Component {
    render() {
        const props = this.props;
        return (React.createElement(NavigatorBar, { leftButton: {
                action: props.backAction,
                image: props.backImage ? props.backImage : assets_1.default.chezhu.back,
                imageStyle: styles.backImage,
            }, title: props.title, titleProperties: {
                numberOfLines: 1,
                lineBreakMode: 'tail'
            }, middleView: props.middleView, rightButtons: props.rightButtons, style: props.headerStyle, showTransparentBar: props.showTransparentBar }));
    }
}
exports.NavHeaderWithBack = NavHeaderWithBack;
class NavigatorBar extends React.Component {
    render() {
        if (this.props.backgroundImage) {
            return (React.createElement(react_native_1.ImageBackground, { resizeMode: 'stretch', source: this.props.backgroundImage, style: [styles.header, this.props.style ? this.props.style : {}] },
                React.createElement(NavButton, { buttons: [this.props.leftButton] }),
                React.createElement(react_native_1.View, { style: [styles.flex, this.props.middleViewStyle] },
                    this.props.title && createTitle(this.props.title, this.props.titleProperties, this.props.titleStyle),
                    this.props.middleView),
                this.props.rightButtons ? React.createElement(NavButton, { buttons: this.props.rightButtons }) : React.createElement(react_native_1.View, { style: styles.buttonContainer })));
        }
        else {
            let statusBar = undefined;
            let topType = {};
            if (this.props.showTransparentBar && (react_native_1.Platform.OS === 'android') && (react_native_1.Platform.Version >= 21)) {
                statusBar = React.createElement(react_native_1.StatusBar, { backgroundColor: colors_1.ThemeRed.GNavBgColor, barStyle: 'light-content', animated: true, translucent: true });
                topType = { paddingTop: 25, height: 75 };
            }
            return (React.createElement(react_native_1.View, { style: [styles.header, topType, this.props.style] },
                statusBar,
                React.createElement(NavButton, { buttons: [this.props.leftButton] }),
                React.createElement(react_native_1.View, { style: [styles.flex, this.props.middleViewStyle] },
                    this.props.title && createTitle(this.props.title, this.props.titleProperties, this.props.titleStyle),
                    this.props.middleView),
                this.props.rightButtons ? React.createElement(NavButton, { buttons: this.props.rightButtons }) : React.createElement(react_native_1.View, { style: styles.buttonContainer })));
        }
    }
}
exports.NavigatorBar = NavigatorBar;
const top = react_native_1.Platform.select({ ios: Util.isIphoneX() ? 0 : 20 });
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: react_native_1.Platform.select({ ios: 58, android: 50 }),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: top,
        backgroundColor: '#e23f42',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        paddingHorizontal: 6,
        height: react_native_1.Platform.select({ ios: 58 - top, android: 50 }),
    },
    backImage: {
        width: 60,
        resizeMode: 'contain'
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    titleText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent',
    }
});
