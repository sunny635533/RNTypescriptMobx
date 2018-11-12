"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
function inMemoryBackend() {
    const store = {};
    return {
        setItem: async (key, value) => {
            store[key] = value;
        },
        getItem: async (key) => {
            return store[key];
        },
        removeItem: async (key) => {
            delete store[key];
        },
    };
}
exports.inMemoryBackend = inMemoryBackend;
function asyncStorageBackend() {
    return {
        setItem: async (key, value) => {
            await react_native_1.AsyncStorage.setItem(key, value);
        },
        getItem: async (key) => {
            return await react_native_1.AsyncStorage.getItem(key);
        },
        removeItem: async (key) => {
            await react_native_1.AsyncStorage.removeItem(key);
        },
    };
}
exports.asyncStorageBackend = asyncStorageBackend;
