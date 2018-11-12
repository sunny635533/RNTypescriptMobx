"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const assets_1 = __importDefault(require("@src/main/assets"));
function isEmptyString(s) {
    if (typeof s === 'string') {
        if (s.trim().length > 0) {
            return false;
        }
    }
    return true;
}
exports.isEmptyString = isEmptyString;
function getDefaultString(s) {
    if (s !== undefined && s !== null && !isEmptyString(s)) {
        return s;
    }
    else {
        return '';
    }
}
exports.getDefaultString = getDefaultString;
function transformDistance(distance) {
    if (distance >= 1000) {
        return (distance / 1000).toFixed(1) + 'km';
    }
    return distance + 'm';
}
exports.transformDistance = transformDistance;
async function outOfAppLink(uri) {
    if (await react_native_1.Linking.canOpenURL(uri)) {
        react_native_1.Linking.openURL(uri);
    }
    else {
        console.warn(`Linking: failed to open ${uri}`);
    }
}
exports.outOfAppLink = outOfAppLink;
async function telephoneLink(phone) {
    if (!isEmptyString(phone)) {
        outOfAppLink('tel:' + phone);
    }
    else {
        react_native_1.DeviceEventEmitter.emit('showToast', '电话是空号');
        console.warn(`Linking tel is null: ${phone}`);
    }
}
exports.telephoneLink = telephoneLink;
function defaultHttpImage(imageUrl, defaultImage) {
    if (isEmptyString(imageUrl)) {
        return defaultImage ? defaultImage : assets_1.default.chezhu.oil;
    }
    return { uri: imageUrl };
}
exports.defaultHttpImage = defaultHttpImage;
function getHttpImageWithSize(imageUrl, width = 350, height = 350, defaultImage) {
    if (width !== 0 && height !== 0) {
        imageUrl = `${imageUrl}.${width}X${height}`;
    }
    return defaultHttpImage(imageUrl, defaultImage);
}
exports.getHttpImageWithSize = getHttpImageWithSize;
