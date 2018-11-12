// Various app configurations.
import { Platform } from 'react-native';
import * as Version from '@src/model/version-control';

export type EnvName
  = 'Dev'
  // ^ Dev env and debugging enabled.
  | 'Production'
  | 'Staging';

const forceUpgradeAPI: string = 'http://api.tvb.com/platform/version.php?product=mytvsuper_remote&env={0}&platform={1}&lang={2}&app_version={3}&os_version={4}';

function lintEnvName(name?: string): EnvName {
  switch (name) {
    case 'Dev':
    case 'Staging':
    case 'Production':
      return name as EnvName;
    default:
      // Unknown env name: default to production.
      return 'Production';
  }
}

export function envFrom(name?: string): Env {
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

export function isPreproduction(name: EnvName): boolean {
  switch (name) {
    case 'Dev':
    case 'Staging':
      return true;
    case 'Production':
    default:
      return false;
  }
}

export interface Env {
  // Core
  name: EnvName;
  isProductionish: boolean;
  host: string;

  forceUpgradeUrl: string;
  codePushDeploymentKey: string;
}

const Production: Env = {
  name: 'Production',
  isProductionish: true,
  // host: 'https://cz.redlion56.com/gwcz/',
  host: 'http://cz.redlion56.com/gwcz/',

  forceUpgradeUrl: forceUpgradeAPI,

  codePushDeploymentKey: Platform.select({
    ios: '8aKt8oBLvgJfFWVYx3j9VtLK_xSJ080db430-e919-421b-b0c5-16a7302cb692',
    android: 'Z0vdD5lxyc3ak0MdciYuInNK03ts080db430-e919-421b-b0c5-16a7302cb692'
  }),
};

const Staging: Env = Object.assign({}, Production, {
  name: 'Staging',
  isProductionish: true,

  codePushDeploymentKey: Platform.select({
    ios: 'Q_QxtfpH7ZsWgioSgV0nwJKixxX4080db430-e919-421b-b0c5-16a7302cb692',
    android: '8Oc8kaXvBVGk40o5BhjdiYb7hvXn080db430-e919-421b-b0c5-16a7302cb692'
  }),
});

const Dev: Env = {
  name: 'Dev',
  isProductionish: false,
  // host: 'https://cz.redlion56.com/gwcz/',
  host: 'http://cz.redlion56.com/gwcz/',

  forceUpgradeUrl: forceUpgradeAPI,

  codePushDeploymentKey: Platform.select({
    ios: 'Q_QxtfpH7ZsWgioSgV0nwJKixxX4080db430-e919-421b-b0c5-16a7302cb692',
    android: '8Oc8kaXvBVGk40o5BhjdiYb7hvXn080db430-e919-421b-b0c5-16a7302cb692'
  }),
};
