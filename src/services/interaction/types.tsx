export const enum BlockingAnimationKind {
  None = 0,
  Darken = 1 << 0,
  Spinner = 1 << 1,
  DarkenAndSpinner = Darken | Spinner,
}

export interface BlockingAnimationOptions {
  kind?: BlockingAnimationKind;
  text?: string;
}

export interface InteractionState {
  blockingAnimationStack: BlockingAnimationOptions[];
  // modelOpen?: boolean;
}

export interface InteractionService {
  blockAndWaitFor<A>(p: Promise<A>, opts?: BlockingAnimationOptions): Promise<A>;
  // onModelOpen(open: boolean): Promise<void>;
  showLoadingView(opts?: BlockingAnimationOptions): Promise<void>;
  hideLoadingView(): Promise<void>;
}
