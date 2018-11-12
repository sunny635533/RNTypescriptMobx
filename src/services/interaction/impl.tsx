import { autobind } from 'core-decorators';
import * as T from '@src/services/interaction/types';


export interface ActivityIndicatorController {
  show(opts?: T.BlockingAnimationOptions): Promise<void>; // show 旋转框
  hide(): Promise<void>;  // hide 旋转框
  onLoadError(e: any): Promise<void>;  // show 网络错误方法
  // onModelOpen(): Promise<void>;
  // onModelClose(): Promise<void>;
}


@autobind
export class InteractionServiceImpl implements T.InteractionService {
  constructor(private actC: ActivityIndicatorController) {
  }

  async blockAndWaitFor<A>(
    p: Promise<A>,
    opts: T.BlockingAnimationOptions
  ): Promise<A> {
    await this.actC.show(opts);
    try {
      return await p;
    } catch (e) {
      await this.actC.onLoadError(e);
      throw e;
    } finally {
      await this.actC.hide();
    }
  }

  // onModelOpen(open: boolean): Promise<void> {
  //   if (open) {
  //     return this.actC.onModelOpen();
  //   } else {
  //     return this.actC.onModelClose();
  //   }
  // }

  async showLoadingView(opts?: T.BlockingAnimationOptions): Promise<void> {
    this.actC.show(opts);
  }

  async hideLoadingView(): Promise<void> {
    this.actC.hide();
  }

}

