"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_level_1 = require("@src/util/type-level");
const promises_1 = require("@src/util/promises");
const U = __importStar(require("@src/web-api/util"));
const xml2js = __importStar(require("xml2js"));
class FetchService {
    constructor(timeoutMs, successCheck, sessionId) {
        this.timeoutMs = timeoutMs;
        this.successCheck = successCheck;
        this.sessionId = sessionId;
    }
    withTimeout(timeoutMs) {
        return new FetchService(timeoutMs);
    }
    updateSessionToken(sessionId) {
        this.sessionId = sessionId;
    }
    async request(uri, request, processResponse) {
        let resp;
        const timeoutMs = this.timeoutMs || U.kDefaultTimeout;
        try {
            const respP = fetch(uri, request);
            const mbTimedOut = await promises_1.timeout(timeoutMs, respP);
            if (mbTimedOut.isLeft()) {
                return type_level_1.Left.ofAny(U.buildTimeoutError(timeoutMs));
            }
            else {
                resp = mbTimedOut.right;
            }
        }
        catch (e) {
            return type_level_1.Left.ofAny(U.buildRequestError(e));
        }
        if (resp.ok) {
            return await processResponse(resp);
        }
        else {
            return type_level_1.Left.ofAny(U.buildResponseNotOk(resp));
        }
    }
    async requestAndDeserializeJson(uri, request, deserializer) {
        if (request.headers && this.sessionId) {
            request.headers = Object.assign(request.headers, { 'sessionId': this.sessionId });
        }
        return this.request(uri, request, async (resp) => {
            let respJson;
            try {
                if (this.successCheck) {
                    respJson = await this.successCheck(await resp.json());
                    console.log('=========== url: ' + uri);
                    console.log('   ======== params: ' + JSON.stringify(request.body));
                    console.log('   ======== result: ' + JSON.stringify(respJson));
                    return U.tryDeserialize(resp, respJson, deserializer);
                }
                else {
                    return U.tryDeserialize(resp, await resp.json(), deserializer);
                }
            }
            catch (e) {
                return type_level_1.Left.ofAny(U.buildCannotDeserialize(e, resp));
            }
        });
    }
    async requestAndDeserializeXml(uri, request, deserializer) {
        return this.request(uri, request, async (resp) => {
            try {
                const text = await resp.text();
                const respXml = await new Promise((k, ek) => {
                    xml2js.parseString(text, (err, resp) => {
                        if (err) {
                            ek(err);
                        }
                        else {
                            k(resp);
                        }
                    });
                });
                return U.tryDeserialize(resp, respXml, deserializer);
            }
            catch (e) {
                return type_level_1.Left.ofAny(U.buildCannotDeserialize(e, resp));
            }
        });
    }
}
exports.FetchService = FetchService;
