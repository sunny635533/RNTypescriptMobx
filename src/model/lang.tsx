import { absurd } from '@src/util';

export namespace Language {
  export type Type = 'cn' | 'hk' | 'en';

  export const HK: Type = 'hk';
  export const CN: Type = 'cn';
  export const EN: Type = 'en';

  export interface Choosable<A> {
    hk: A;
    cn: A;
    en: A;
  }

  export function choose<A>(lang: Type, o: Choosable<A>): A {
    switch (lang) {
      case 'hk':
        return o.hk;
      case 'cn':
        return o.cn;
      case 'en':
        return o.en;
      default:
        return absurd(`Language.choose: not a Language: ${lang}`);
    }
  }

  export function check(raw: string): raw is Type {
    return raw === 'hk' || raw === 'cn' || raw === 'en';
  }
}
