"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_decorators_1 = require("core-decorators");
let InteractionServiceImpl = class InteractionServiceImpl {
    constructor(actC) {
        this.actC = actC;
    }
    async blockAndWaitFor(p, opts) {
        await this.actC.show(opts);
        try {
            return await p;
        }
        catch (e) {
            await this.actC.onLoadError(e);
            throw e;
        }
        finally {
            await this.actC.hide();
        }
    }
    async showLoadingView(opts) {
        this.actC.show(opts);
    }
    async hideLoadingView() {
        this.actC.hide();
    }
};
InteractionServiceImpl = __decorate([
    core_decorators_1.autobind
], InteractionServiceImpl);
exports.InteractionServiceImpl = InteractionServiceImpl;
