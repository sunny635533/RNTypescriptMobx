// FRP Behaviors, that is, a value that can be changed asynchronously.
// See http://conal.net/blog/posts/simplifying-semantics-with-type-class-morphisms
//
// We might want to switch to RxJS instead of rolling our own implementation,
// but currently a simple behavior should suffice.

// import { BehaviorSubject, Subscription } from 'rxjs';

export interface ListenerId {
  remove(): void;
}

type Listener<A> = (a: A) => Promise<void>;

// Need to be an abstract class to provide some wired-in methods.
export abstract class IRef<A> {
  abstract value: A;
  abstract setValue(val: A): Promise<void>;

  async modify<B>(f: (old: A) => [A, B]): Promise<B> {
    const old = this.value;
    const [new_, res] = f(old);
    await this.setValue(new_);
    return res;
  }

  modify_(f: (old: A) => A): Promise<void> {
    const old = this.value;
    return this.setValue(f(old));
  }

  abstract attachListener(f: Listener<A>): ListenerId;
}

/*
export class MutRef<A> implements IRef<A> {
  private impl: BehaviorSubject<A>;

  constructor(val: A) {
    this.impl = new BehaviorSubject(val);
  }

  get value(): A {
    return this.impl.value;
  }

  async setValue(val: A): Promise<boolean> {
    this.impl.next(val);
    return true;
  }

  attachListener(f: (a: A) => void): ListenerId {
    return this.impl.subscribe(f) as any;
  }

  removeListener(id: ListenerId): void {
    (id as any as Subscription).unsubscribe();
  }
}
*/

export class MutRef<A> extends IRef<A> {
  private val: A;
  private listeners: {[key: string]: Listener<A>} = {};
  private idGen: number = 0;

  constructor(val: A) {
    super();
    this.val = val;
  }

  get value(): A {
    return this.val;
  }

  async setValue(val: A) {
    this.val = val;
    for (const k of Object.keys(this.listeners)) {
      // Concurrent deletions, as long as each deletion originates
      // only from its listener, should be fine.
      await this.listeners[k](val);
    }
  }

  attachListener(f: Listener<A>): ListenerId {
    const id = String(this.idGen++);
    this.listeners[id] = f;

    return {
      remove: () => {
        this.removeListener(id);
      }
    };
  }

  private removeListener(id: string) {
    delete this.listeners[id];
  }
}

