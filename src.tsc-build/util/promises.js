"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_decorators_1 = require("core-decorators");
const type_level_1 = require("@src/util/type-level");
function delay(ms) {
    return new Promise((k) => setTimeout(k, ms));
}
exports.delay = delay;
async function timeout(ms, p) {
    async function done() {
        return type_level_1.Right.ofAny(await p);
    }
    async function timedOut() {
        await delay(ms);
        return type_level_1.Left.ofAny(undefined);
    }
    return Promise.race([done(), timedOut()]);
}
exports.timeout = timeout;
function withRetry(spec, action) {
    function shallTryAgain(nthRetry) {
        switch (spec.kind) {
            case 'forever':
                return true;
            case 'limited':
                return nthRetry < spec.maximumRetries;
        }
    }
    const shallCollectErrors = spec.kind === 'limited';
    return async () => {
        const errors = [];
        for (let i = 0; shallTryAgain(i); ++i) {
            try {
                const res = await action();
                return type_level_1.Right.ofAny(res);
            }
            catch (e) {
                console.warn(`Retry due to ${e}`);
                if (spec.beforeEachRetry) {
                    await spec.beforeEachRetry(e);
                }
                if (shallCollectErrors) {
                    errors.push(e);
                }
                await delay(spec.nextDelayInMs());
            }
        }
        return type_level_1.Left.ofAny({ errors });
    };
}
exports.withRetry = withRetry;
let SimpleThrottler = class SimpleThrottler {
    constructor(duration) {
        this.duration = duration;
        this.firing = false;
    }
    tryFire() {
        if (!this.firing) {
            this.fire();
            return true;
        }
        else {
            return false;
        }
    }
    async fire() {
        this.firing = true;
        await delay(this.duration);
        this.firing = false;
    }
};
SimpleThrottler = __decorate([
    core_decorators_1.autobind
], SimpleThrottler);
exports.SimpleThrottler = SimpleThrottler;
