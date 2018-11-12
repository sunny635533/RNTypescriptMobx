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
function ScaleText(ps) {
    return (React.createElement(react_native_1.Text, Object.assign({ style: ps.style, allowFontScaling: false, onPress: ps.onPress }, ps.textProps), ps.text ? ps.text : ''));
}
exports.ScaleText = ScaleText;
