
// Type safer than Object.assign({}, a, update)
export function copyWith<A>(a: A, modify: (a: A) => void): A {
  const a_ = Object.assign({}, a);
  modify(a_);
  return a_;
}

// splitEvery(3, [1, 2, 3, 4, 5, 6]) == [[1, 2, 3], [4, 5, 6]]
export function splitEvery<A>(n: number, xs: A[]): A[][] {
  const res: A[][] = [];

  // Populate.
  const resLen = Math.ceil(xs.length / n);
  for (let i = 0; i < resLen; ++i) {
    res.push([]);
  }

  // Move.
  xs.forEach((x, i) => {
    res[Math.floor(i / n)][i % n] = x;
  });
  return res;
}

// As its type (and name) suggests.
export function filterNonNull<A>(xs: (A | undefined)[]): A[] {
  return xs.filter(x => x !== undefined) as A[];
}

// pTMO([a, b, c], d, 5) === [a, b, c, d, d]
// pTMO([a, b, c], d, 2) === pTMO([a, b, c], d, 4) === [a, b, c, d]
export function padToMultipleOf<A>(xs: A[], y: A, toMultipleOf: number): A[] {
  xs = xs.slice();
  const extra = xs.length % toMultipleOf;
  if (!extra) {
    return xs;
  } else {
    const toPad = toMultipleOf - extra;
    for (let i = 0; i < toPad; ++i) {
      xs.push(y);
    }
    return xs;
  }
}
