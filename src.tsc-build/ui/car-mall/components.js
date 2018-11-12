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
const assets_1 = __importDefault(require("@src/main/assets"));
const colors_1 = require("@src/ui/colors");
const react_native_ratings_1 = require("react-native-ratings");
const components_1 = require("@src/ui/components");
const react_native_keyboard_spacer_1 = __importDefault(require("react-native-keyboard-spacer"));
const core_decorators_1 = require("core-decorators");
function Store(ps) {
    return (React.createElement(react_native_1.TouchableOpacity, { style: styles.storeContainer, activeOpacity: 0.7, onPress: ps.itemClick },
        React.createElement(react_native_1.Image, { source: ps.thumail, style: styles.storeImage }),
        React.createElement(Description, { title: ps.storeName, content: ps.monthlySales, star: ps.star, redLionExclusive: ps.redLionExclusive, redLionSelfEmployed: ps.redLionSelfEmployed }),
        React.createElement(react_native_1.View, { style: styles.storeRightView },
            React.createElement(react_native_1.Text, { style: [styles.monthlySales, { fontSize: 14 }] }, ps.distance),
            React.createElement(react_native_1.TouchableOpacity, { onPress: ps.navigateToMap },
                React.createElement(react_native_1.Text, { style: styles.navigation }, "\u5BFC\u822A")))));
}
exports.Store = Store;
function ProductItem(ps) {
    return (React.createElement(react_native_1.TouchableOpacity, { style: styles.storeContainer, activeOpacity: 0.7, onPress: ps.itemClick },
        React.createElement(react_native_1.Image, { source: ps.thumail, style: styles.storeImage }),
        React.createElement(Description, { title: ps.storeName, content: ps.content, price: ps.price, priceUnit: ps.priceUnit, redLionExclusive: ps.redLionExclusive, redLionSelfEmployed: ps.redLionSelfEmployed, contentStyle: { justifyContent: 'flex-start' } }),
        React.createElement(react_native_1.View, { style: [styles.storeRightView, { alignSelf: 'flex-end' }] },
            React.createElement(react_native_1.Text, { style: [styles.monthlySales, { fontSize: 14, marginBottom: 3 }] }, ps.monthlySales))));
}
exports.ProductItem = ProductItem;
function Description(ps) {
    return React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'space-between', } },
        React.createElement(react_native_1.Text, { style: styles.storeName, numberOfLines: 1, lineBreakMode: 'tail' }, ps.title),
        (!ps.redLionExclusive && !ps.redLionSelfEmployed) && React.createElement(react_native_1.View, { style: styles.flex }),
        React.createElement(react_native_1.View, { style: [styles.starContainer, ps.contentStyle] },
            React.createElement(react_native_1.Text, { style: styles.monthlySales }, ps.content),
            ps.star && React.createElement(react_native_1.View, { style: styles.shortLine }),
            ps.star && React.createElement(react_native_1.Text, { style: styles.monthlySales }, ps.star)),
        React.createElement(react_native_1.View, { style: styles.flexDirectionRowCenter },
            ps.redLionExclusive && React.createElement(react_native_1.Text, { style: [styles.monthlySales, { marginRight: 6 }] },
                React.createElement(react_native_1.Text, { style: styles.price }, ps.price),
                ps.priceUnit),
            ps.redLionExclusive && React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.red_lion_exclusive }),
            ps.redLionSelfEmployed && React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.red_lion_self_employed, style: { marginLeft: 5 } })));
}
exports.Description = Description;
class StoreDetailView extends React.Component {
    componentWillReceiveProps(newProps) {
        this.rating.setCurrentRating(newProps.ratingCount);
    }
    render() {
        const ps = this.props;
        return (React.createElement(react_native_1.View, { style: styles.storeDetailView },
            React.createElement(react_native_1.View, { style: [styles.flexDirectionRowCenter, { marginBottom: 10 }] },
                React.createElement(react_native_1.Image, { source: ps.storeImageUri, style: [styles.storeImage, { width: 60, height: 50 }] }),
                React.createElement(react_native_1.View, { style: { flexShrink: 1 } },
                    React.createElement(react_native_1.Text, { style: styles.storeDetailName, numberOfLines: 1, lineBreakMode: 'tail' }, ps.name),
                    React.createElement(react_native_1.View, { style: styles.flexDirectionRow, pointerEvents: 'none' },
                        React.createElement(react_native_ratings_1.Rating, { ref: (ref) => this.rating = ref, type: 'custom', ratingCount: 5, imageSize: 15, ratingColor: colors_1.ThemeRed.GTheme, ratingBackgroundColor: colors_1.ThemeGray.GLineGray, startingValue: ps.ratingCount, fractions: 2 }),
                        React.createElement(react_native_1.Text, { style: styles.rateText },
                            "[ \u8BC4\u5206",
                            ps.ratingCount,
                            " ]")))),
            React.createElement(react_native_1.View, { style: styles.flexDirectionRowCenter },
                React.createElement(react_native_1.Text, { style: styles.storeDetailAddress, numberOfLines: 1, lineBreakMode: 'tail' }, ps.address),
                React.createElement(react_native_1.TouchableOpacity, { style: styles.distanceContainer, onPress: ps.navigateToMap },
                    React.createElement(react_native_1.Text, { style: styles.storeDetailDistance }, ps.distance),
                    React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.daohang })),
                React.createElement(react_native_1.TouchableOpacity, { onPress: ps.phoneCall, style: { padding: 15 } },
                    React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.call })))));
    }
}
exports.StoreDetailView = StoreDetailView;
function ProductDescription(ps) {
    const oilPriceFont = ps.redLionExclusive ? {} : { fontSize: 18 };
    return (React.createElement(react_native_1.View, { style: styles.productDescriptContainer },
        ps.redLionExclusive && React.createElement(react_native_1.Text, { style: styles.price }, ps.price),
        React.createElement(react_native_1.View, { style: [styles.flexDirectionRowCenter, { marginBottom: 10, marginTop: 6, }] },
            React.createElement(react_native_1.Text, { style: [styles.monthlySales, styles.flex, oilPriceFont] }, ps.oilStationPrice),
            React.createElement(react_native_1.Text, { style: styles.monthlySales }, ps.monthlySales)),
        React.createElement(react_native_1.Text, { style: [styles.storeName, { marginBottom: 5 }] }, ps.storeName),
        React.createElement(react_native_1.View, { style: styles.flexDirectionRow },
            ps.redLionExclusive && React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.red_lion_exclusive }),
            ps.redLionSelfEmployed && React.createElement(react_native_1.Image, { source: assets_1.default.chezhu.red_lion_self_employed, style: { marginLeft: 5 } }))));
}
exports.ProductDescription = ProductDescription;
function CommentView(ps) {
    return React.createElement(react_native_1.View, { style: styles.commentView },
        React.createElement(react_native_1.View, { style: styles.flexDirectionRowCenter },
            React.createElement(react_native_1.Image, { source: ps.headerImage, style: styles.circleImage }),
            React.createElement(react_native_1.Text, { style: { marginHorizontal: 7 } }, ps.phone),
            React.createElement(react_native_1.View, { pointerEvents: 'none' },
                React.createElement(react_native_ratings_1.Rating, { type: 'custom', ratingCount: 5, imageSize: 15, ratingColor: colors_1.ThemeRed.GTheme, ratingBackgroundColor: colors_1.ThemeGray.GLineGray, startingValue: ps.ratingCount, fractions: 2 }))),
        React.createElement(react_native_1.Text, { style: { marginVertical: 5, color: colors_1.ThemeGray.GLightGray } }, ps.production),
        React.createElement(react_native_1.Text, null, ps.comment));
}
exports.CommentView = CommentView;
function PayProductItem(ps) {
    return React.createElement(react_native_1.View, { style: styles.productBg },
        React.createElement(react_native_1.Image, { source: ps.imageUri, style: styles.productImage }),
        React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'space-between' } },
            React.createElement(react_native_1.Text, { style: styles.storeName }, ps.title),
            React.createElement(react_native_1.View, { style: styles.flexDirectionRowCenter },
                React.createElement(react_native_1.Text, { style: [styles.storeName, { fontSize: 14, flex: 1 }] },
                    React.createElement(react_native_1.Text, { style: styles.price }, ps.price),
                    ps.unit),
                React.createElement(react_native_1.Text, { style: [styles.monthlySales, { fontSize: 18 }] }, ps.count))));
}
exports.PayProductItem = PayProductItem;
class CountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }
    render() {
        return React.createElement(react_native_1.View, { style: styles.countView },
            React.createElement(react_native_1.Text, { style: [styles.storeName, { flex: 1 }] }, "\u8D2D\u4E70\u6570\u91CF"),
            React.createElement(components_1.TouchImageWithText, { onPress: () => {
                    if (this.state.value > 1) {
                        this.setState({ value: this.state.value - 1 }, () => {
                            this.props.getCount(this.state.value);
                        });
                    }
                }, imageUri: assets_1.default.chezhu.minus, imageStyle: styles.plusImage }),
            React.createElement(react_native_1.Text, { style: styles.countInput }, this.state.value),
            React.createElement(components_1.TouchImageWithText, { onPress: () => {
                    this.setState({ value: this.state.value + 1 }, () => {
                        this.props.getCount(this.state.value);
                    });
                }, imageUri: assets_1.default.chezhu.plus, imageStyle: styles.plusImage }));
    }
}
exports.CountView = CountView;
let InputView = class InputView extends React.Component {
    constructor(props) {
        super(props);
    }
    changedText() {
        if (react_native_1.Platform.OS === 'ios') {
            this.textInputRef.setNativeProps({ text: this.props.value });
        }
    }
    render() {
        const ps = this.props;
        return React.createElement(react_native_1.View, { style: styles.inputView },
            React.createElement(react_native_1.Text, { style: styles.inputTitle }, ps.title),
            React.createElement(react_native_1.View, { style: styles.inputBg },
                React.createElement(react_native_1.Text, { style: [styles.storeName, { fontSize: 25, marginRight: react_native_1.Platform.select({ ios: 5, android: 0 }) }] }, ps.identifier),
                React.createElement(react_native_1.TextInput, { ref: (inputRef) => this.textInputRef = inputRef, style: styles.inputText, value: ps.value, placeholderTextColor: '#cccccc', placeholder: ps.placeholder, underlineColorAndroid: 'transparent', keyboardType: 'numeric', onChangeText: (text) => {
                        ps.changedText && ps.changedText(text);
                    } })),
            React.createElement(react_native_keyboard_spacer_1.default, { topSpacing: 10 }));
    }
};
InputView = __decorate([
    core_decorators_1.autobind
], InputView);
exports.InputView = InputView;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    flexDirectionRowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 12,
        borderTopWidth: 0.5,
        borderTopColor: colors_1.ThemeGray.GLineGray
    },
    storeImage: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
        marginRight: 12
    },
    storeName: {
        color: colors_1.ThemeGray.GGreatGray,
        fontSize: 17,
    },
    storeRightView: {
        marginLeft: 50,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    starContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    monthlySales: {
        color: colors_1.ThemeGray.GLightGray,
        fontSize: 14,
        textAlignVertical: 'center'
    },
    shortLine: {
        width: 1,
        height: 13,
        backgroundColor: colors_1.ThemeGray.GLineGray,
        marginHorizontal: 10,
    },
    price: {
        fontSize: 18,
        color: colors_1.ThemeRed.GNavBgColor,
        textAlignVertical: 'center'
    },
    navigation: {
        color: colors_1.ThemeBlue.GGreatBlue,
        fontSize: 15,
        borderColor: colors_1.ThemeBlue.GGreatBlue,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    redLionImage: {
        width: 80,
        height: 25,
        resizeMode: 'contain',
    },
    storeDetailView: {
        padding: 15,
        backgroundColor: 'white'
    },
    storeDetailName: {
        fontSize: 19,
        marginVertical: 5,
    },
    rateText: {
        marginLeft: 10,
        color: colors_1.ThemeGray.GLightGray
    },
    storeDetailAddress: {
        flex: 1,
        color: colors_1.ThemeGray.GGreatGray,
        fontSize: 14,
        textAlignVertical: 'center'
    },
    storeDetailDistance: {
        color: colors_1.ThemeBlue.GGreatBlue,
        fontSize: 14
    },
    distanceContainer: {
        borderRightWidth: 1,
        borderRightColor: colors_1.ThemeGray.GLineGray,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    productDescriptContainer: {
        backgroundColor: 'white',
        padding: 10
    },
    circleImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    commentView: {
        marginTop: 1,
        paddingHorizontal: 12,
        paddingVertical: 15,
        backgroundColor: 'white'
    },
    productBg: {
        flexDirection: 'row',
        padding: 13,
        backgroundColor: '#fafafa',
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    plusImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    countView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    countInput: {
        fontSize: 22,
        width: 60,
        textAlign: 'center'
    },
    inputView: {
        marginVertical: 10,
        backgroundColor: 'white',
        padding: 13,
        paddingTop: 16
    },
    inputTitle: {
        fontSize: 19,
        color: colors_1.ThemeGray.GGreatGray,
    },
    inputBg: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: react_native_1.Platform.select({ ios: 15, android: 0 }),
    },
    inputText: {
        flex: 1,
        fontSize: 20,
        textAlignVertical: 'center',
    },
});
