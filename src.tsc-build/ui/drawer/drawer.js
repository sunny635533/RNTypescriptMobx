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
const base_component_1 = require("@src/ui/base-component");
const datas_1 = require("./datas");
const components_1 = require("./components");
class DrawerScreen extends base_component_1.BaseComponent {
    render() {
        console.log('props= ' + JSON.stringify(this.props));
        return (React.createElement(react_native_1.ScrollView, { style: { flex: 1 } }, datas_1.drawerDatas.map((data, i) => {
            const cellProps = components_1.descrToCellProps(data, this.appContext, this.props.navigation);
            return React.createElement(components_1.DrawerCellElement, { key: i, props: cellProps });
        })));
    }
}
exports.DrawerScreen = DrawerScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
