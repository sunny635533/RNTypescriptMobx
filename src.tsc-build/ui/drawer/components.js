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
const scale_text_1 = require("@src/ui/components/scale-text");
const lang_1 = require("@src/model/lang");
const container_1 = require("@src/ui/nav/container");
function touchCell(onPress) {
    return ((x) => React.createElement(react_native_1.TouchableOpacity, { onPress: onPress }, x));
}
function languageChooseHint(type, label) {
    if (label.hints_hk && label.hints_cn && label.hints_en) {
        return lang_1.Language.choose(type, {
            cn: label.hints_cn,
            hk: label.hints_cn,
            en: label.hints_en
        });
    }
    else {
        return '';
    }
}
function descrToCellProps(cellDescr, ctx, navigation) {
    const lang = ctx.app.lang.value;
    return Object.assign({
        kind: cellDescr.kind,
        label: cellDescr.label ? lang_1.Language.choose(lang, cellDescr.label) : '',
        hints: cellDescr.label ? languageChooseHint(lang, cellDescr.label) : '',
        icon: cellDescr.icon,
        notForProduction: cellDescr.notForProduction,
        navigation: navigation,
        strings: ctx.app.localizedStrings,
    }, ctx);
}
exports.descrToCellProps = descrToCellProps;
function HintsText(ps) {
    return React.createElement(scale_text_1.ScaleText, { style: [styles.hintText, ps.tstyle], text: ps.text });
}
exports.HintsText = HintsText;
function DrawerCellElement(cp) {
    const props = cp.props;
    let decorateCell = (x) => x;
    switch (props.kind) {
        case 0:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 1:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 2:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 3:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 4:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 5:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 6:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
        case 7:
            decorateCell = touchCell(() => props.navigation.navigate(container_1.Contants.ROUTE_SETTING_SCREEN));
            break;
    }
    return (decorateCell(React.createElement(react_native_1.View, { style: styles.flexDirection },
        props.icon && React.createElement(react_native_1.Image, { style: styles.cellImage, source: props.icon }),
        React.createElement(scale_text_1.ScaleText, { style: styles.label, text: props.label }),
        props.rightComponent ?
            React.createElement(react_native_1.View, { style: { position: 'absolute', right: 15, alignSelf: 'center' } }, props.rightComponent) :
            null)));
}
exports.DrawerCellElement = DrawerCellElement;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
    },
    line: {
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#eeeeee'
    },
    hintText: {
        color: '#999999',
        fontSize: 16,
        marginRight: 10,
    },
    label: {
        color: '#fff',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    cellImage: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 20,
    },
    cellRight: {
        position: 'absolute',
        right: 15,
        alignSelf: 'center',
    }
});
