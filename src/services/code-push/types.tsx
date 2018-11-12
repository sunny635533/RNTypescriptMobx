import { AppService } from '@src/services/app/types';

export { AppService };


export interface HotpatchDelegate {
  onHotpatchDownloadStart(): void;
  onHotpatchDownloadProgress(done: number, total: number): void;
  onHotpatchDownloadFinish(): void;
}

export interface CodePushService {
  renderHotpatchDownloadingMessage(app: AppService, percent?: number): string;
  checkForHotpatch(deploymentKey: string, delegate: HotpatchDelegate): void;
  // shouldForceUpgradeNativeApp(app: AppService): boolean;
  allowReStart(): void;
}