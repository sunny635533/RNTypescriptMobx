"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const core_decorators_1 = require("core-decorators");
const app_context_1 = __importDefault(require("@src/mobx/app-context"));
exports.AppStore = app_context_1.default;
const mobx_1 = require("mobx");
let BaseComponent = class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.strings = app_context_1.default.app.localizedStrings;
        this.params = this.getNavigationParams();
    }
    getNavigationParams() {
        if (this.props.navigation.state.params) {
            return this.props.navigation.state.params;
        }
        const msg = `absurd: BaseComponent navigation.state.params is ${this.props.navigation.state.params}`;
        return Object.assign({});
    }
};
__decorate([
    mobx_1.observable
], BaseComponent.prototype, "strings", void 0);
BaseComponent = __decorate([
    core_decorators_1.autobind
], BaseComponent);
exports.BaseComponent = BaseComponent;
