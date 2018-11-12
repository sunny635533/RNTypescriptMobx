import { Language } from '@src/model/lang';

export interface AlertSpec {
  title: string;
  ok: string;
  body?: string;
}

export type LocalizedErrorMap = {
  __default__: AlertSpec,
  X86NotSupported: AlertSpec,
};

const kGeneralNetworkFailure: Language.Choosable<string> = {
  en: 'Unable to connect to server. Please check WiFi / 3G connection and setting.',
  hk: '無法連線到伺服器，請檢查你的WiFi或网络設定',
  cn: '无法连接到服务器，请检查你的WiFi或网络設定',
};

const kDeviceNotSupported: Language.Choosable<string> = {
  en: 'Sorry, your device is not currently supported.',
  hk: '設備暫未支援',
  cn: '设备暂未支持',
};

const kOk: Language.Choosable<string> = {
  en: 'OK',
  hk: '確定',
  cn: '确定',
};

export type ErasedErrorMap = { [key: string]: AlertSpec | undefined };

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

export interface LocalizedStrings {
  errormap: LocalizedErrorMap;
  // Used by Android only.
  hints_before_quit_app: string;
  bundleUpdating: string;
  lbl_force_upgrade: string;
  btn_force_upgrade: string;
}

const hk: LocalizedStrings = {
  hints_before_quit_app: '再按返回鍵即離開本程式',
  errormap: kErrorMap.cn,
  bundleUpdating: '資料更新中',
  lbl_force_upgrade: '版本更新',
  btn_force_upgrade: '更新',
};

const cn: LocalizedStrings = {
  hints_before_quit_app: '再按返回键即离开本程式',
  errormap: kErrorMap.cn,
  bundleUpdating: '资料更新中',
  lbl_force_upgrade: '版本更新',
  btn_force_upgrade: '更新',
};

const en: LocalizedStrings = {
  hints_before_quit_app: 'Press back once more time to exit',
  errormap: kErrorMap.en,
  bundleUpdating: 'Updating',
  lbl_force_upgrade: 'Version Upgrade',
  btn_force_upgrade: 'Upgrade',
};

export const strings = {
  hk: hk,
  en: en,
  cn: cn,
};