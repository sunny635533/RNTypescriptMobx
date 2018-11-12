"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@src/util");
var Language;
(function (Language) {
    Language.HK = 'hk';
    Language.CN = 'cn';
    Language.EN = 'en';
    function choose(lang, o) {
        switch (lang) {
            case 'hk':
                return o.hk;
            case 'cn':
                return o.cn;
            case 'en':
                return o.en;
            default:
                return util_1.absurd(`Language.choose: not a Language: ${lang}`);
        }
    }
    Language.choose = choose;
    function check(raw) {
        return raw === 'hk' || raw === 'cn' || raw === 'en';
    }
    Language.check = check;
})(Language = exports.Language || (exports.Language = {}));
