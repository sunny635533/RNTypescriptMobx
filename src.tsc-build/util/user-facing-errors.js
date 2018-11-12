"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebApi = __importStar(require("@src/web-api/types"));
const react_native_1 = require("react-native");
function presentErrorAsAlert(errorName, errorMap) {
    const e = renderError(errorName, errorMap);
    react_native_1.Alert.alert(e.title, e.body);
}
exports.presentErrorAsAlert = presentErrorAsAlert;
function presentExceptionAsAlert(e, errorMap) {
    const ex = renderSomeException(e, errorMap);
    react_native_1.Alert.alert(ex.title, ex.body);
}
exports.presentExceptionAsAlert = presentExceptionAsAlert;
function renderError(errorName, errorMap) {
    let spec = errorMap[errorName];
    if (!spec) {
        spec = errorMap.__default__;
    }
    let errorCode;
    switch (errorName) {
        case 'X86NotSupported':
            errorCode = 201;
            break;
        case 'CannotDeserializeResponseBody':
            errorCode = 301;
            break;
        case 'ResponseNotOk':
            errorCode = 302;
            break;
        case 'PossiblyTimedOut':
            errorCode = 303;
            break;
        case 'RequestError':
            errorCode = 304;
            break;
        default:
            errorCode = 401;
            break;
    }
    const body = spec.body ? spec.body + ' ' : '';
    return {
        title: spec.title,
        body: `${body}(${errorCode})`,
        ok: spec.ok
    };
}
exports.renderError = renderError;
function renderSomeException(e, emap) {
    let errorName;
    if (WebApi.isException(e)) {
        errorName = WebApi.ErrorKinds.show(e.kind);
    }
    else {
        console.warn(`Really unknown exception: ${e}`);
        errorName = '::UnknownException';
    }
    return renderError(errorName, emap);
}
exports.renderSomeException = renderSomeException;
