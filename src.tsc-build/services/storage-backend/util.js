"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_level_1 = require("@src/util/type-level");
const mutref_1 = require("@src/util/mutref");
var Conv;
(function (Conv) {
    function jsonConvWithValidator(validate) {
        return {
            convertLeft: (a) => type_level_1.Right.ofAny(JSON.stringify(a)),
            convertRight: (s) => {
                let raw;
                try {
                    raw = JSON.parse(s);
                }
                catch (e) {
                    return type_level_1.Left.ofAny(`jsonConv: ${e}`);
                }
                if (validate(raw)) {
                    return type_level_1.Right.ofAny(raw);
                }
                else {
                    return type_level_1.Left.ofAny('jsonConv: invalid');
                }
            },
        };
    }
    Conv.jsonConvWithValidator = jsonConvWithValidator;
})(Conv = exports.Conv || (exports.Conv = {}));
class PersistentValue extends mutref_1.IRef {
    constructor(storageKey, conv, backend) {
        super();
        this.storageKey = storageKey;
        this.conv = conv;
        this.backend = backend;
        this.storageKey = storageKey;
        this.conv = conv;
        this.backend = backend;
    }
    get value() {
        return this.cached.value;
    }
    async setValue(val) {
        const oldVal = this.cached.value;
        await this.cached.setValue(val);
        try {
            const serialized = this.conv.convertLeft(val);
            if (serialized.isRight() && serialized.right != null) {
                await this.backend.setItem(this.storageKey, serialized.right);
                return;
            }
        }
        catch (e) {
            console.error('storage/impl-persistent: cannot setItem', e);
        }
        await this.cached.setValue(oldVal);
    }
    attachListener(f) {
        return this.cached.attachListener(f);
    }
    async load(defaultValue) {
        try {
            const storedValue = this.conv.convertRight(await this.backend.getItem(this.storageKey));
            if (storedValue.isRight()) {
                const value = storedValue.right;
                this.cached = new mutref_1.MutRef(value);
                return true;
            }
        }
        catch (e) {
        }
        this.cached = new mutref_1.MutRef(defaultValue());
        return false;
    }
}
exports.PersistentValue = PersistentValue;
