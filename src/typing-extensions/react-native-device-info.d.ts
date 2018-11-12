declare module 'react-native-device-info' {
  interface DeviceInfo {
    // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
    // * note this is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled
    getUniqueID(): string;

    // e.g. Apple
    getManufacturer(): string;

    // e.g. iPhone 6
    getModel(): string;

    // e.g. iPhone7,2 / or the board on Android e.g. goldfish
    getDeviceId(): string;

    getSystemName(): string;  // e.g. iPhone OS

    getSystemVersion(): string;  // e   g. 9.0

    getBundleId(): string;  // e.g. com.learnium.mobile

    getBuildNumber(): string;  // XXX: string on iOS, number on Android

    getVersion(): string;  // e.g. 1.1.0

    getReadableVersion(): string;  // e.g. 1.1.0.89

    getDeviceName(): string;  // e.g. Becca's iPhone 6

    getUserAgent(): string; // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)

    getDeviceLocale(): string; // e.g en-US

    getDeviceLocale(): string; // such as: en-US

    getDeviceCountry(): string; // e.g US

    getInstanceID(): string;

    getBrand(): string;

    getTimezone():string;

    isEmulator():string;

    isTablet():string;

    isPinOrFingerprintSet():string;
  }

  const DeviceInfo: DeviceInfo;

  export = DeviceInfo;
}
