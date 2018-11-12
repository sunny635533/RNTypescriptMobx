import { Either, Left, Right } from '@src/util/type-level';
import { IRef, MutRef, ListenerId } from '@src/util/mutref';
import * as T from '@src/services/storage-backend/types';

export namespace Conv {
  export interface Bidir<A, B> {
    convertLeft(a: A): Result<B>;
    convertRight(b: B): Result<A>;
  }

  export type Result<A> = Either<string, A>;

  export type StringConvertible<A> = Bidir<A, string>;

  export function jsonConvWithValidator<A>(
    validate: (a: any) => boolean
  ): StringConvertible<A> {
    return {
      convertLeft: (a: A) => Right.ofAny(JSON.stringify(a)),
      convertRight: (s: string): Result<A> => {
        let raw: any;
        try {
          raw = JSON.parse(s);
        } catch (e) {
          return Left.ofAny(`jsonConv: ${e}`);
        }
        if (validate(raw)) {
          return Right.ofAny(raw as A);
        } else {
          return Left.ofAny('jsonConv: invalid');
        }
      },
    };
  }
}

// XXX: Need to find a way to compose loads into a batch load.
export class PersistentValue<A> extends IRef<A> {
  private cached: MutRef<A>;

  constructor(private storageKey: string,
    private conv: Conv.Bidir<A, string | null>,
    private backend: T.KeyValueBackendService) {
    super();
    this.storageKey = storageKey;
    this.conv = conv;
    this.backend = backend;
  }

  get value(): A {
    return this.cached.value;
  }

  async setValue(val: A): Promise<void> {
    const oldVal = this.cached.value;
    await this.cached.setValue(val);
    try {
      const serialized = this.conv.convertLeft(val);
      if (serialized.isRight() && serialized.right != null) {
        await this.backend.setItem(this.storageKey, serialized.right);
        // We are good.
        return;
      }
      // Otherwise: falls through.
    } catch (e) {
      // XXX: What to do?
      console.error('storage/impl-persistent: cannot setItem', e);
      // Falls through.
    }
    // Roll back. XXX: This could cause strange effects if unfortunate.
    await this.cached.setValue(oldVal);
  }

  attachListener(f: (a: A) => Promise<void>): ListenerId {
    return this.cached.attachListener(f);
  }

  async load(defaultValue: () => A): Promise<boolean> {
    try {
      const storedValue = this.conv.convertRight(await this.backend.getItem(this.storageKey));
      if (storedValue.isRight()) {
        const value = storedValue.right;
        this.cached = new MutRef(value);
        return true;
      }
    } catch (e) {
    }

    this.cached = new MutRef(defaultValue());
    return false;
  }
}

// XXX: Too complex. Don't use this for now.
// namespace Set {
//   interface PersistentSet {
//     name: string;
//     nextId: number;
//     entries: {[key: string]: number};
//   }

//   const kSerde = Conv.jsonConvWithValidator<PersistentSet>(x => {
//     const { name, nextId, entries } = x;
//     return typeof name === 'string' &&
//       typeof nextId === 'number' &&
//       entries instanceof Object;
//   });

//   export async function loadByName(name: string, backend: T.KeyValueBackendService) {
//     const v = new PersistentValue<PersistentSet>(`set:${name}`, kSerde, backend);
//     await v.load(() => ({
//       name: name,
//       nextId: 1,
//       entries: {},
//     }));
//     return v;
//   }

//   // Insert an entry into the set named `collectionName`. Returns true if the entry
//   // was not present and the insertion was successful, or false if the entry was already
//   // present in the set.
//   export async function insert(
//     collectionName: string,
//     entry: string,
//     backend: T.KeyValueBackendService
//   ): Promise<number> {

//     const v = await loadByName(collectionName, backend);
//     const collection = v.value;

//     if (entry in collection.entries) {
//       // Found, do nothing.
//       return collection.entries[entry];
//     } else {
//       // Not found.
//       const id = collection.nextId++;
//       collection.entries[entry] = id;
//       if (await v.setValue(collection)) {
//         return id;
//       } else {
//         throw Error('Failed to setValue');
//       }
//     }
//   }

//   export async function lookup(
//     collectionName: string,
//     entry: string,
//     backend: T.KeyValueBackendService
//   ): Promise<number> {
//     const v = await loadByName(collectionName, backend);
//     if (entry in v.value.entries) {
//       return v.value.entries[entry];
//     } else {
//       return -1;
//     }
//   }

//   export async function entries(
//     collectionName: string,
//     backend: T.KeyValueBackendService
//   ): Promise<string[]> {
//     const v = await loadByName(collectionName, backend);
//     return Object.keys(v.value.entries);
//   }
// }

// XXX: Too complex. Don't use this for now.
// namespace Map {
//   export async function insert<A>(
//     collectionName: string,
//     backend: T.KeyValueBackendService,
//     conv: Conv.StringConvertible<A>,
//     key: string,
//     value: A
//   ) {
//     const id = await Set.insert(collectionName, key, backend);
//     const v = new PersistentValue<A>(`map:${collectionName}:id:${id}`, conv, backend);
//     await v.load(() => value);
//     return await v.setValue(value);
//   }

//   export async function remove(
//     collectionName: string,
//     backend: T.KeyValueBackendService,
//     key: string
//   ) {
//     const id = await Set.lookup(collectionName, key, backend);
//     if (id === -1) {
//     }
//   }
// }
