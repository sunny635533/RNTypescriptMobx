"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_decorators_1 = require("core-decorators");
const mutref_1 = require("@src/util/mutref");
let StorageStateRef = class StorageStateRef extends mutref_1.IRef {
    constructor(refs) {
        super();
        this.refs = refs;
    }
    get value() {
        return read(this.refs);
    }
    async setValue(v) {
        const v0 = this.value;
        if (v.language !== v0.language) {
            await this.refs.language.setValue(v.language);
        }
        if (v.notificationEnabled !== v0.notificationEnabled) {
            await this.refs.notificationEnabled.setValue(v.notificationEnabled);
        }
    }
    attachListener(f) {
        const i1 = this.refs.language.attachListener(_ => this.fire(f));
        const i2 = this.refs.notificationEnabled.attachListener(_ => this.fire(f));
        return {
            remove() {
                [i1, i2].forEach(i => i.remove());
            }
        };
    }
    fire(f) {
        return f(this.value);
    }
};
StorageStateRef = __decorate([
    core_decorators_1.autobind
], StorageStateRef);
exports.StorageStateRef = StorageStateRef;
function read(service) {
    return {
        language: service.language.value,
        notificationEnabled: service.notificationEnabled.value,
    };
}
