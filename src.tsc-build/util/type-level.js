"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("@src/util/objects");
class EitherBase {
    isLeft() {
        return !this.isRight();
    }
    fmap(f) {
        return this.elim(e => Left.of(e), a => Right.of(f(a)));
    }
    bind(f) {
        return this.elim(e => Left.of(e), a => f(a));
    }
    bindAsync(f) {
        return this.elim(e => Promise.resolve(Left.of(e)), a => f(a));
    }
    bimap(f, g) {
        return this.elim(e => Left.of(f(e)), a => Right.of(g(a)));
    }
    fmapLeft(f) {
        return this.bimap(e => f(e), id);
    }
}
function id(a) {
    return a;
}
exports.id = id;
function compose(f, g) {
    return a => f(g(a));
}
exports.compose = compose;
class Left extends EitherBase {
    constructor(value_) {
        super();
        this.value_ = value_;
    }
    get left() {
        return this.value_;
    }
    absurdRight() {
        return this;
    }
    elim(f, _) {
        return f(this.value_);
    }
    isRight() {
        return false;
    }
    static of(e) {
        return new Left(e);
    }
    static ofAny(e) {
        return Left.of(e);
    }
}
exports.Left = Left;
class Right extends EitherBase {
    constructor(value_) {
        super();
        this.value_ = value_;
    }
    get right() {
        return this.value_;
    }
    isRight() {
        return true;
    }
    elim(_, g) {
        return g(this.value_);
    }
    static of(a) {
        return new Right(a);
    }
    static ofAny(a) {
        return Right.of(a);
    }
}
exports.Right = Right;
var Eithers;
(function (Eithers) {
    function elim3(e, f, g, h) {
        return e.elim(f, e1b => e1b.elim(g, h));
    }
    Eithers.elim3 = elim3;
    function rotR3(e) {
        return Eithers.elim3(e, e1 => Left.ofAny(Left.ofAny(e1)), e2 => Left.ofAny(Right.ofAny(e2)), Right.ofAny);
    }
    Eithers.rotR3 = rotR3;
    Eithers.projLeft = Left.of;
    Eithers.projRight = Right.of;
    function racePromises(rs) {
        return new Promise(resolve => {
            let resolveFired = false;
            let rejections = 0;
            let errors = Array(rs.length);
            rs.forEach((p, i) => {
                p.then((r) => {
                    if (r.isRight()) {
                        if (resolveFired) {
                            return;
                        }
                        resolveFired = true;
                        resolve(Eithers.projRight(r.right));
                    }
                    else {
                        if (resolveFired) {
                            return;
                        }
                        errors[i] = r.left;
                        if (++rejections >= rs.length) {
                            resolveFired = true;
                            resolve(Eithers.projLeft(errors));
                        }
                    }
                });
            });
        });
    }
    Eithers.racePromises = racePromises;
})(Eithers = exports.Eithers || (exports.Eithers = {}));
function absurd(error) {
    const msg = `absurd: the impossible happened: ${error}`;
    console.warn(msg);
    throw Error(msg);
}
exports.absurd = absurd;
var Lens;
(function (Lens) {
    function modify(lens, f) {
        return s0 => {
            const a0 = lens.getL(s0);
            const a = f(a0);
            if (a !== a0) {
                return lens.setL(s0, a);
            }
            else {
                return s0;
            }
        };
    }
    Lens.modify = modify;
    function compose(sa, ab) {
        return {
            setL: (s, b) => modify(sa, a => modify(ab, () => b)(a))(s),
            getL: s => ab.getL(sa.getL(s)),
        };
    }
    Lens.compose = compose;
    function index(ix) {
        return {
            setL: (xs, x) => {
                const x0 = xs[ix];
                if (x === x0) {
                    return xs;
                }
                else {
                    xs = xs.slice();
                    xs[ix] = x;
                    return xs;
                }
            },
            getL: xs => xs[ix],
        };
    }
    Lens.index = index;
    function last() {
        return {
            getL: xs => xs[xs.length - 1],
            setL: (xs, a) => {
                const a0 = xs[xs.length - 1];
                if (a === a0) {
                    return xs;
                }
                else {
                    xs = xs.slice();
                    xs[xs.length - 1] = a;
                    return xs;
                }
            },
        };
    }
    Lens.last = last;
    function attr(getL, setL) {
        return {
            setL: (s, a) => {
                const a0 = getL(s);
                if (a === a0) {
                    return s;
                }
                else {
                    return objects_1.copyWith(s, s => setL(s, a));
                }
            },
            getL,
        };
    }
    Lens.attr = attr;
})(Lens = exports.Lens || (exports.Lens = {}));
function constant(a) {
    return () => a;
}
exports.constant = constant;
var Arrays;
(function (Arrays) {
    function push(xs, x) {
        const ys = xs.slice();
        ys.push(x);
        return ys;
    }
    Arrays.push = push;
    function pop(xs) {
        const ys = xs.slice();
        const y = ys.pop();
        return [ys, y];
    }
    Arrays.pop = pop;
})(Arrays = exports.Arrays || (exports.Arrays = {}));
var Fold;
(function (Fold) {
    function throughLens(lens, f) {
        return (s, n) => Lens.modify(lens, a => f(a, n))(s);
    }
    Fold.throughLens = throughLens;
    function sequence(rs) {
        return (s, a) => {
            rs.forEach(r => s = r(s, a));
            return s;
        };
    }
    Fold.sequence = sequence;
    function withDefault(s0, f) {
        return (s = s0, a) => f(s, a);
    }
    Fold.withDefault = withDefault;
})(Fold = exports.Fold || (exports.Fold = {}));
