"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IRef {
    async modify(f) {
        const old = this.value;
        const [new_, res] = f(old);
        await this.setValue(new_);
        return res;
    }
    modify_(f) {
        const old = this.value;
        return this.setValue(f(old));
    }
}
exports.IRef = IRef;
class MutRef extends IRef {
    constructor(val) {
        super();
        this.listeners = {};
        this.idGen = 0;
        this.val = val;
    }
    get value() {
        return this.val;
    }
    async setValue(val) {
        this.val = val;
        for (const k of Object.keys(this.listeners)) {
            await this.listeners[k](val);
        }
    }
    attachListener(f) {
        const id = String(this.idGen++);
        this.listeners[id] = f;
        return {
            remove: () => {
                this.removeListener(id);
            }
        };
    }
    removeListener(id) {
        delete this.listeners[id];
    }
}
exports.MutRef = MutRef;
