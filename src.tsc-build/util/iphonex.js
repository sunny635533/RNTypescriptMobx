"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { width, height } = react_native_1.Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
function isIphoneX() {
    return (react_native_1.Platform.OS === 'ios' &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
            (height === X_WIDTH && width === X_HEIGHT)));
}
exports.isIphoneX = isIphoneX;
