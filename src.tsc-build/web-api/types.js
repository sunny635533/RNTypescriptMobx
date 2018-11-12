"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorKind;
(function (ErrorKind) {
    ErrorKind[ErrorKind["CannotDeserializeResponseBody"] = 0] = "CannotDeserializeResponseBody";
    ErrorKind[ErrorKind["ResponseNotOk"] = 1] = "ResponseNotOk";
    ErrorKind[ErrorKind["PossiblyTimedOut"] = 2] = "PossiblyTimedOut";
    ErrorKind[ErrorKind["RequestError"] = 3] = "RequestError";
})(ErrorKind = exports.ErrorKind || (exports.ErrorKind = {}));
var ErrorKinds;
(function (ErrorKinds) {
    function requestPossiblySent(e) {
        switch (e) {
            case 0:
            case 1:
            case 2:
                return true;
            case 3:
                return false;
        }
    }
    ErrorKinds.requestPossiblySent = requestPossiblySent;
    function show(e) {
        switch (e) {
            case 0:
                return 'CannotDeserializeResponseBody';
            case 1:
                return 'ResponseNotOk';
            case 2:
                return 'PossiblyTimedOut';
            case 3:
                return 'RequestError';
        }
    }
    ErrorKinds.show = show;
})(ErrorKinds = exports.ErrorKinds || (exports.ErrorKinds = {}));
class Exception {
    constructor(kind, rawResponse) {
        this.kind = kind;
        this.rawResponse = rawResponse;
    }
    toString() {
        return `ApiResponse.Exception: kind = ${this.kind}, rawResponse = ${JSON.stringify(this.rawResponse)}`;
    }
}
exports.Exception = Exception;
function isException(e) {
    return e instanceof Exception;
}
exports.isException = isException;
async function isNonfatalNetworkException(anyE) {
    if (isException(anyE)) {
        const e = anyE;
        if (ErrorKinds.requestPossiblySent(e.kind)) {
            return true;
        }
    }
    return false;
}
exports.isNonfatalNetworkException = isNonfatalNetworkException;
