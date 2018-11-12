"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_decorators_1 = require("core-decorators");
function shortSummary(tracer) {
    return tracer.finishedCalls.map(v => v.shortSummary).join('\n');
}
exports.shortSummary = shortSummary;
let PerfTracer = class PerfTracer {
    constructor() {
        this.pending = new Map();
        this.finished = new Map();
        this.nextId = 1;
    }
    enter(name) {
        const id = this.nextId++;
        this.pending.set(id, new Call(name));
        return id;
    }
    leave(id) {
        const call = this.pending.get(id);
        this.pending.delete(id);
        this.finished.set(id, call.finish());
    }
    async enterAsync(name, p) {
        const id = this.enter(name);
        try {
            return await p();
        }
        finally {
            this.leave(id);
        }
    }
    get finishedCalls() {
        const ids = [];
        for (let k of this.finished.keys()) {
            ids.push(k);
        }
        ids.sort();
        return ids.map(id => this.finished.get(id));
    }
};
PerfTracer = __decorate([
    core_decorators_1.autobind
], PerfTracer);
exports.PerfTracer = PerfTracer;
class Call {
    constructor(name) {
        this.name = name;
        this.start = new Date;
    }
    finish() {
        this.end = new Date;
        return this;
    }
    get duration() {
        return this.end.getTime() - this.start.getTime();
    }
    get shortSummary() {
        return `${this.name}: ${this.duration}`;
    }
}
exports.Call = Call;
