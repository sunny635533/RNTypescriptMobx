"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = __importDefault(require("@src/main/assets"));
var CellKind;
(function (CellKind) {
    CellKind[CellKind["Verified"] = 0] = "Verified";
    CellKind[CellKind["DriverCertification"] = 1] = "DriverCertification";
    CellKind[CellKind["MyRoute"] = 2] = "MyRoute";
    CellKind[CellKind["MyCar"] = 3] = "MyCar";
    CellKind[CellKind["MyScores"] = 4] = "MyScores";
    CellKind[CellKind["FreightSettlement"] = 5] = "FreightSettlement";
    CellKind[CellKind["Scan"] = 6] = "Scan";
    CellKind[CellKind["Settings"] = 7] = "Settings";
})(CellKind = exports.CellKind || (exports.CellKind = {}));
exports.drawerDatas = [
    {
        kind: 0,
        label: {
            cn: '实名认证',
            hk: '实名认证',
            en: 'Verified',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 1,
        label: {
            cn: '驾照认证',
            hk: '驾照认证',
            en: 'Driver Certification',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 2,
        label: {
            cn: '我的路线',
            hk: '我的路线',
            en: 'My Route',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 3,
        label: {
            cn: '我的车辆',
            hk: '我的车辆',
            en: 'My car',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 4,
        label: {
            cn: '我的积分',
            hk: '我的积分',
            en: 'My scores',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 5,
        label: {
            cn: '运费结算',
            hk: '运费结算',
            en: 'Freight Settlement',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 6,
        label: {
            cn: '扫一扫',
            hk: '扫一扫',
            en: 'Scan',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
    {
        kind: 7,
        label: {
            cn: '设定',
            hk: '設定',
            en: 'Settings',
        },
        icon: assets_1.default.chezhu.my_wallet_truck,
    },
];
