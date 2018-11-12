"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kGeneralNetworkFailure = {
    en: 'Unable to connect to server. Please check WiFi / 3G connection and setting.',
    hk: '無法連線到伺服器，請檢查你的WiFi或网络設定',
    cn: '无法连接到服务器，请检查你的WiFi或网络設定',
};
const kDeviceNotSupported = {
    en: 'Sorry, your device is not currently supported.',
    hk: '設備暫未支援',
    cn: '设备暂未支持',
};
const kOk = {
    en: 'OK',
    hk: '確定',
    cn: '确定',
};
const kErrorMap = {
    cn: {
        __default__: {
            title: kGeneralNetworkFailure.cn,
            ok: kOk.cn
        },
        X86NotSupported: {
            title: kDeviceNotSupported.cn,
            ok: kOk.cn
        }
    },
    hk: {
        __default__: {
            title: kGeneralNetworkFailure.hk,
            ok: kOk.hk
        },
        X86NotSupported: {
            title: kDeviceNotSupported.hk,
            ok: kOk.hk
        }
    },
    en: {
        __default__: {
            title: kGeneralNetworkFailure.en,
            ok: kOk.en,
        },
        X86NotSupported: {
            title: kDeviceNotSupported.en,
            ok: kOk.en
        }
    }
};
const hk = {
    hints_before_quit_app: '再按返回鍵即離開本程式',
    errormap: kErrorMap.cn,
    bundleUpdating: '資料更新中',
    lbl_force_upgrade: '版本更新',
    btn_force_upgrade: '更新',
};
const cn = {
    hints_before_quit_app: '再按返回键即离开本程式',
    errormap: kErrorMap.cn,
    bundleUpdating: '资料更新中',
    lbl_force_upgrade: '版本更新',
    btn_force_upgrade: '更新',
};
const en = {
    hints_before_quit_app: 'Press back once more time to exit',
    errormap: kErrorMap.en,
    bundleUpdating: 'Updating',
    lbl_force_upgrade: 'Version Upgrade',
    btn_force_upgrade: 'Upgrade',
};
exports.strings = {
    hk: hk,
    en: en,
    cn: cn,
};
