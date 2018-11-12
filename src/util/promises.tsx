import { autobind } from 'core-decorators';
import { Either, Left, Right } from '@src/util/type-level';

// Returns a promise that gets resolved after `ms` milliseconds.
export function delay(ms: number): Promise<void> {
  return new Promise<void>((k) => setTimeout(k, ms));
}

export type MaybeTimedOut<A> = Either<void, A>;

export async function timeout<A>(ms: number, p: Promise<A>): Promise<MaybeTimedOut<A>> {
  async function done(): Promise<MaybeTimedOut<A>> {
    return Right.ofAny(await p);
  }
  async function timedOut(): Promise<MaybeTimedOut<A>> {
    await delay(ms);
    return Left.ofAny<void>(undefined);
  }
  return Promise.race([done(), timedOut()]);
}

interface RetrySpecCommon {
  beforeEachRetry?: (e: any) => Promise<void>;
  nextDelayInMs: () => number;
}

type RetrySpecBase<A> = ({
  kind: 'limited',
  maximumRetries: number;
} & A) | ({
  kind: 'forever',
} & A);

export type RetrySpec = RetrySpecBase<RetrySpecCommon>;

export interface RetryFailure {
  errors: any[];
}

export function withRetry<A>(
  spec: RetrySpec,
  action: () => Promise<A>
): () => Promise<Either<RetryFailure, A>> {

  function shallTryAgain(nthRetry: number /* 0-based */) {
    switch (spec.kind) {
    case 'forever':
      return true;
    case 'limited':
      return nthRetry < spec.maximumRetries;
    }
  }

  // Don't collect errors when we retry forever.
  const shallCollectErrors = spec.kind === 'limited';

  return async () => {
    const errors: any[] = [];
    for (let i = 0; shallTryAgain(i); ++i) {
      try {
        const res = await action();
        return Right.ofAny(res);
      } catch (e) {
        console.warn(`Retry due to ${e}`);
        if (spec.beforeEachRetry) {
          await spec.beforeEachRetry(e);
        }
        if (shallCollectErrors) {
          errors.push(e);
        }
        // And wait for some time until the next retry.
        await delay(spec.nextDelayInMs());
      }
    }
    return Left.ofAny({ errors });
  };
}

@autobind
export class SimpleThrottler {
  private firing = false;

  constructor(private duration: number) {
  }

  tryFire(): boolean {
    if (!this.firing) {
      this.fire();
      return true;
    } else {
      return false;
    }
  }

  private async fire() {
    this.firing = true;
    await delay(this.duration);
    this.firing = false;
  }
}
