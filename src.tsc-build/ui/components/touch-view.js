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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const core_decorators_1 = require("core-decorators");
let ChooseGroup = class ChooseGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: this.props.selectIndex ? this.props.selectIndex : 0
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: this.props.style }, this.props.beanList.map((bean, i) => {
            const actualIndex = bean.beanIndex ? bean.beanIndex : i;
            let text = bean.text;
            let uri = bean.imageUri;
            let textStyle = this.props.unSelectTextStyle;
            let imageStyle = this.props.unSelectImageStyle;
            let touchStyle = this.props.unSelectTouchStyle;
            if (this.state.selectIndex === actualIndex) {
                textStyle = this.props.selectTextStyle ? this.props.selectTextStyle : textStyle;
                imageStyle = this.props.selectImageStyle ? this.props.selectImageStyle : imageStyle;
                touchStyle = this.props.selectTouchStyle ? this.props.selectTouchStyle : touchStyle;
                text = bean.selectText ? bean.selectText : text;
                uri = bean.selectImageUri ? bean.selectImageUri : uri;
            }
            return (React.createElement(TouchImageWithText, { key: i, index: actualIndex, imageUri: uri, text: text, onPress: () => this.onPress(actualIndex, bean.onPress), imageStyle: imageStyle, textStyle: textStyle, touchStyle: touchStyle, activeOpacity: this.props.activeOpacity }));
        })));
    }
    onPress(index, press) {
        let actualIndex = index;
        if (this.props.cancelChoose && (this.state.selectIndex === index)) {
            actualIndex = -1;
        }
        this.setState({
            selectIndex: actualIndex
        });
        if (press) {
            press(actualIndex);
        }
    }
};
ChooseGroup = __decorate([
    core_decorators_1.autobind
], ChooseGroup);
exports.ChooseGroup = ChooseGroup;
function ChooseImageWithText(props) {
    const { imageUri, selectImageUri, onPress, text, touchStyle, textStyle, imageStyle, selectText, select } = props;
    let image = imageUri;
    let title = text;
    if (select) {
        image = selectImageUri ? selectImageUri : image;
        title = selectText ? selectText : text;
    }
    return (React.createElement(TouchImageWithText, { onPress: onPress, imageUri: image, text: title, imageStyle: imageStyle, textStyle: textStyle, touchStyle: touchStyle }));
}
exports.ChooseImageWithText = ChooseImageWithText;
function TouchImageWithText(ps) {
    return React.createElement(react_native_1.TouchableOpacity, { disabled: ps.disabled ? ps.disabled : false, activeOpacity: ps.activeOpacity ? 0.8 : ps.activeOpacity, style: [styles.center, ps.touchStyle], onPress: () => ps.onPress(ps.index) },
        ps.imageUri && React.createElement(react_native_1.Image, { source: ps.imageUri, style: ps.imageStyle }),
        ps.text && React.createElement(react_native_1.Text, { style: ps.textStyle }, ps.text));
}
exports.TouchImageWithText = TouchImageWithText;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
});
