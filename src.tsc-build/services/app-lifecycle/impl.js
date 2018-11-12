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
const react_native_1 = require("react-native");
let FilteredAppLifecycle = class FilteredAppLifecycle {
    constructor(stateSource, initialState) {
        this.shouldDropNextActive = false;
        this.sRef = new mutref_1.MutRef(initialState);
        stateSource(this.onChange);
    }
    fireOnResume() {
        this.onChange('active');
    }
    ignoreNextActivityLaunchAndroid() {
        this.shouldDropNextActive = react_native_1.Platform.select({
            ios: false,
            android: true,
        });
    }
    async onChange(s) {
        if (s === 'active' && this.shouldDropNextActive) {
            this.shouldDropNextActive = false;
        }
        else {
            await this.sRef.setValue(s);
        }
    }
    attachListener(f) {
        return this.sRef.attachListener(f);
    }
    get currentState() {
        return this.sRef.value;
    }
};
FilteredAppLifecycle = __decorate([
    core_decorators_1.autobind
], FilteredAppLifecycle);
exports.FilteredAppLifecycle = FilteredAppLifecycle;
