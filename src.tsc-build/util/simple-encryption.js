"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function xorEncryption(key, data) {
    let tempArray = [...data];
    return tempArray.map((char, i) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(Math.floor(i % key.length)));
    }).join('');
}
function b64Encode(data) {
    let o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = '';
    if (!data) {
        return data;
    }
    do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        enc += exports.b64Table.charAt(h1) + exports.b64Table.charAt(h2) + exports.b64Table.charAt(h3) + exports.b64Table.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
function b64Decode(data) {
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
    if (!data) {
        return data;
    }
    data += '';
    do {
        h1 = exports.b64Table.indexOf(data.charAt(i++));
        h2 = exports.b64Table.indexOf(data.charAt(i++));
        h3 = exports.b64Table.indexOf(data.charAt(i++));
        h4 = exports.b64Table.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(String.fromCharCode(o1));
        if (h3 !== 64) {
            result.push(String.fromCharCode(o2));
            if (h4 !== 64) {
                result.push(String.fromCharCode(o3));
            }
        }
    } while (i < data.length);
    return result.join('');
}
function encrypt(key, data) {
    return b64Encode(xorEncryption(key, data));
}
exports.encrypt = encrypt;
function decrypt(key, data) {
    return xorEncryption(key, b64Decode(data));
}
exports.decrypt = decrypt;
