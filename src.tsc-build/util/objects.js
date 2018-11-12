"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function copyWith(a, modify) {
    const a_ = Object.assign({}, a);
    modify(a_);
    return a_;
}
exports.copyWith = copyWith;
function splitEvery(n, xs) {
    const res = [];
    const resLen = Math.ceil(xs.length / n);
    for (let i = 0; i < resLen; ++i) {
        res.push([]);
    }
    xs.forEach((x, i) => {
        res[Math.floor(i / n)][i % n] = x;
    });
    return res;
}
exports.splitEvery = splitEvery;
function filterNonNull(xs) {
    return xs.filter(x => x !== undefined);
}
exports.filterNonNull = filterNonNull;
function padToMultipleOf(xs, y, toMultipleOf) {
    xs = xs.slice();
    const extra = xs.length % toMultipleOf;
    if (!extra) {
        return xs;
    }
    else {
        const toPad = toMultipleOf - extra;
        for (let i = 0; i < toPad; ++i) {
            xs.push(y);
        }
        return xs;
    }
}
exports.padToMultipleOf = padToMultipleOf;
