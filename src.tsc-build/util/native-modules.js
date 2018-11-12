"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const RN = __importStar(require("react-native"));
function loadNativeBridge() {
    if (RN) {
        return RN.NativeModules.TFNativeBridge;
    }
    else {
        throw new Error('Not running in the RN environment');
    }
}
exports.loadNativeBridge = loadNativeBridge;
