"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const forceUpgradeAPI = 'http://api.tvb.com/platform/version.php?product=mytvsuper_remote&env={0}&platform={1}&lang={2}&app_version={3}&os_version={4}';
function lintEnvName(name) {
    switch (name) {
        case 'Dev':
        case 'Staging':
        case 'Production':
            return name;
        default:
            return 'Production';
    }
}
function envFrom(name) {
    switch (lintEnvName(name)) {
        case 'Dev':
            return Dev;
        case 'Staging':
            return Staging;
        case 'Production':
        default:
            return Production;
    }
}
exports.envFrom = envFrom;
function isPreproduction(name) {
    switch (name) {
        case 'Dev':
        case 'Staging':
            return true;
        case 'Production':
        default:
            return false;
    }
}
exports.isPreproduction = isPreproduction;
const Production = {
    name: 'Production',
    isProductionish: true,
    host: 'http://cz.redlion56.com/gwcz/',
    forceUpgradeUrl: forceUpgradeAPI,
    codePushDeploymentKey: react_native_1.Platform.select({
        ios: '8aKt8oBLvgJfFWVYx3j9VtLK_xSJ080db430-e919-421b-b0c5-16a7302cb692',
        android: 'Z0vdD5lxyc3ak0MdciYuInNK03ts080db430-e919-421b-b0c5-16a7302cb692'
    }),
};
const Staging = Object.assign({}, Production, {
    name: 'Staging',
    isProductionish: true,
    codePushDeploymentKey: react_native_1.Platform.select({
        ios: 'Q_QxtfpH7ZsWgioSgV0nwJKixxX4080db430-e919-421b-b0c5-16a7302cb692',
        android: '8Oc8kaXvBVGk40o5BhjdiYb7hvXn080db430-e919-421b-b0c5-16a7302cb692'
    }),
});
const Dev = {
    name: 'Dev',
    isProductionish: false,
    host: 'http://cz.redlion56.com/gwcz/',
    forceUpgradeUrl: forceUpgradeAPI,
    codePushDeploymentKey: react_native_1.Platform.select({
        ios: 'Q_QxtfpH7ZsWgioSgV0nwJKixxX4080db430-e919-421b-b0c5-16a7302cb692',
        android: '8Oc8kaXvBVGk40o5BhjdiYb7hvXn080db430-e919-421b-b0c5-16a7302cb692'
    }),
};
