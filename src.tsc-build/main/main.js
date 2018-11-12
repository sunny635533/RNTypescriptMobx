"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const bootstrap_1 = require("@src/main/bootstrap");
const react_native_code_push_1 = __importDefault(require("react-native-code-push"));
let codePushOptions = { checkFrequency: react_native_code_push_1.default.CheckFrequency.MANUAL };
const CPBootstrap = react_native_code_push_1.default(codePushOptions)(bootstrap_1.Bootstrap);
react_native_1.AppRegistry.registerComponent('Main', () => CPBootstrap);
