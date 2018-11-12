import { copyWith } from '@src/util/objects';

// Tag type A with type T without changing the runtime representation.
// a === Tagged.of(a) === Tagged.into(Tagged.of(a))

// export class Tagged<T, A> {
//   private _taggedBrand: Tagged<T, A>;

//   static of<T, A>(a: A): Tagged<T, A> {
//     return a as any as Tagged<T, A>;
//   }

//   static into<T, A>(a: Tagged<T, A>): A {
//     return a as any as A;
//   }
// }

// // See https://en.wikipedia.org/wiki/Option_type
// export type Maybe<A> = Just<A> | Nothing<A>;
// interface Just<A> {
//   kind: 'Just';
//   value: A;
// }
// interface Nothing<A> {
//   kind: 'Nothing';
// }

// export function fromMaybe<A>(a: A, ma: Maybe<A>): A {
//   if (ma.kind === 'Just') {
//     return ma.value;
//   } else {
//     return a;
//   }
// }

// See https://en.wikipedia.org/wiki/Algebraic_data_type
//
// This, together with EitherBase.isRight, allows us to use a simplified
// syntax for elimination:
//
// if (either.isRight()) {
//   (either is now typed as Right)
//   use(either.right);
// } else {
//   (either is now typed as Left)
//   use(either.left);
// }
export type Either<E, A> = Left<E, A> | Right<E, A>;

// See the Either type above.
abstract class EitherBase<E, A> {
  abstract isRight(): this is Right<E, A>;
  abstract elim<B>(f: (e: E) => B, g: (a: A) => B): B;

  isLeft(): this is Left<E, A> {
    return !this.isRight();
  }

  fmap<B>(f: (a: A) => B): Either<E, B> {
    return this.elim<Either<E, B>>(
      e => Left.of<E, B>(e),
      a => Right.of<E, B>(f(a))
    );
  }

  bind<B>(f: (a: A) => Either<E, B>): Either<E, B> {
    return this.elim<Either<E, B>>(
      e => Left.of<E, B>(e),
      a => f(a)
    );
  }

  // (>>=) :: E e a -> (a -> P (E e b)) -> P (E e b)
  // Not quite useful as a more general form is (>>=) :: P (E e a) -> (a -> P (E e b)) -> P (E e b)
  bindAsync<B>(f: (a: A) => Promise<Either<E, B>>): Promise<Either<E, B>> {
    return this.elim<Promise<Either<E, B>>>(
      e => Promise.resolve(Left.of<E, B>(e)),
      a => f(a)
    );
  }

  bimap<F, B>(f: (e: E) => F, g: (a: A) => B): Either<F, B> {
    return this.elim<Either<F, B>>(
      e => Left.of<F, B>(f(e)),
      a => Right.of<F, B>(g(a))
    );
  }

  fmapLeft<F>(f: (e: E) => F): Either<F, A> {
    return this.bimap(
      e => f(e),
      id
    );
  }
}

export function id<A>(a: A) {
  return a;
}

// Shouldn't be too useful as bidirectional type inference in TypeScript is nonexistent.
export function compose<A, B, C>(f: (a: B) => C, g: (b: A) => B): (a: A) => C {
  return a => f(g(a));
}

export class Left<E, A> extends EitherBase<E, A> {
  get left(): E {
    return this.value_;
  }

  absurdRight(): Either<E, any> {
    // Since a Left<E, A> contains no A.
    return this as any;
  }

  elim<B>(f: (e: E) => B, _: (a: A) => B): B {
    return f(this.value_);
  }

  isRight(): this is Right<E, A> {
    return false;
  }

  private constructor(private value_: E) {
    super();
  }

  static of<E, A>(e: E): Either<E, A> {
    return new Left<E, A>(e);
  }

  // Unsafe. Use this only when you know what you are doing.
  static ofAny<E>(e: E): Either<E, any> {
    return Left.of<E, any>(e);
  }
}

export class Right<E, A> extends EitherBase<E, A> {
  get right(): A {
    return this.value_;
  }

  isRight(): this is Right<E, A> {
    return true;
  }

  elim<B>(_: (e: E) => B, g: (a: A) => B): B {
    return g(this.value_);
  }

  private constructor(private value_: A) {
    super();
  }

  static of<E, A>(a: A): Either<E, A> {
    return new Right<E, A>(a);
  }

  // Unsafe. Use this only when you know what you are doing.
  static ofAny<A>(a: A): Either<any, A> {
    return Right.of<any, A>(a);
  }
}

export namespace Eithers {
  export function elim3<E1, E2, A, B>(
    e: Either<E1, Either<E2, A>>,
    f: (e1: E1) => B,
    g: (e2: E2) => B,
    h: (a: A) => B
  ): B {
    return e.elim(f, e1b => e1b.elim(g, h));
  }

  export function rotR3<E1, E2, A>(e: Either<E1, Either<E2, A>>): Either<Either<E1, E2>, A> {
    return Eithers.elim3<E1, E2, A, Either<Either<E1, E2>, A>>(
      e,
      e1 => Left.ofAny(Left.ofAny(e1)),
      e2 => Left.ofAny(Right.ofAny(e2)),
      Right.ofAny);
  }

  export const projLeft = Left.of;
  export const projRight = Right.of;

  // Returns a promise that resolves to the first Right case from the array, or
  // if all failed, returns an array of failures.
  export function racePromises<E, A>(
    rs: Promise<Either<E, A>>[]
  ): Promise<Either<E[], A>> {
    return new Promise<Either<E[], A>>(resolve => {
      let resolveFired = false;
      let rejections = 0;
      let errors: E[] = Array(rs.length);
      rs.forEach((p, i) => {
        p.then((r) => {
          if (r.isRight()) {
            if (resolveFired) {
              return;
            }

            resolveFired = true;
            resolve(projRight<E[], A>(r.right));
          } else {
            if (resolveFired) {
              return;
            }

            errors[i] = r.left;
            if (++rejections >= rs.length) {
              resolveFired = true;
              // All rejected.
              resolve(projLeft<E[], A>(errors));
            }
          }
        });
      });
    });
  }
}

// Literally.  See https://en.wikipedia.org/wiki/Principle_of_explosion
export function absurd(error: string): never {
  const msg = `absurd: the impossible happened: ${error}`;
  console.warn(msg);
  throw Error(msg);
}

// For an explanation on functional lenses see http://stackoverflow.com/a/5769285/513106
//
// We don't have functor here so we need to use a simpler type.
// And it's much less powerful.
export interface Lens<S, A> {
  setL(s: S, a: A): S;
  getL(s: S): A;
}

export namespace Lens {
  export function modify<S, A>(lens: Lens<S, A>, f: (a: A) => A): (s: S) => S {
    return s0 => {
      const a0 = lens.getL(s0);
      const a = f(a0);
      if (a !== a0) {
        return lens.setL(s0, a);
      } else {
        return s0;
      }
    };
  }

  export function compose<S, A, B>(sa: Lens<S, A>, ab: Lens<A, B>): Lens<S, B> {
    return {
      setL: (s, b) => modify(sa, a => modify(ab, () => b)(a))(s),
      getL: s => ab.getL(sa.getL(s)),
    };
  }

  export function index<A>(ix: number): Lens<A[], A> {
    return {
      setL: (xs, x) => {
        const x0 = xs[ix];
        if (x === x0) {
          return xs;
        } else {
          xs = xs.slice();
          xs[ix] = x;
          return xs;
        }
      },
      getL: xs => xs[ix],
    };
  }

  export function last<A>(): Lens<A[], A> {
    return {
      getL: xs => xs[xs.length - 1],
      setL: (xs, a) => {
        const a0 = xs[xs.length - 1];
        if (a === a0) {
          return xs;
        } else {
          xs = xs.slice();
          xs[xs.length - 1] = a;
          return xs;
        }
      },
    };
  }

  export function attr<S, A>(getL: (s: S) => A, setL: (s: S, a: A) => void): Lens<S, A> {
    return {
      setL: (s, a) => {
        const a0 = getL(s);
        if (a === a0) {
          return s;
        } else {
          return copyWith(s, s => setL(s, a));
        }
      },
      getL,
    };
  }
}

// See https://en.wikipedia.org/wiki/SKI_combinator_calculus
export function constant<A>(a: A): () => A {
  return () => a;
}

export namespace Arrays {
  export function push<A>(xs: ReadonlyArray<A>, x: A): ReadonlyArray<A> {
    const ys = xs.slice();
    ys.push(x);
    return ys;
  }

  export function pop<A>(xs: ReadonlyArray<A>): [ReadonlyArray<A>, A] {
    const ys = xs.slice();
    const y = ys.pop()!;
    return [ys, y];
  }
}

export type Fold<S, A> = (s: S, a: A) => S;

export namespace Fold {
  export function throughLens<S, A, B>(lens: Lens<S, A>, f: Fold<A, B>): Fold<S, B> {
    return (s, n) => Lens.modify(lens, a => f(a, n))(s);
  }

  export function sequence<S, A>(rs: Fold<S, A>[]): Fold<S, A> {
    return (s, a) => {
      rs.forEach(r => s = r(s, a));
      return s;
    };
  }

  export function withDefault<S, A>(s0: S, f: Fold<S, A>): Fold<S, A> {
    return (s = s0, a) => f(s, a);
  }
}

