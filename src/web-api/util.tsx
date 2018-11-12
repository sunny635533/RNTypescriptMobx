import { Either, Eithers, Left, Right } from '@src/util/type-level';
import * as T from '@src/web-api/types';
import { Platform } from 'react-native';

export const kDefaultTimeout = 15000;

export function isDeserializationError(
  b: T.ResponseError
): b is T.CannotDeserializeResponseBody {
  return b.kind === T.ErrorKind.CannotDeserializeResponseBody;
}

export function isRequestError(
  b: T.ResponseError
): b is T.RequestError {
  return b.kind === T.ErrorKind.RequestError;
}

export function isTimeoutError(
  b: T.ResponseError
): b is T.TimeoutError {
  return b.kind === T.ErrorKind.PossiblyTimedOut;
}

export function isResponseNotOk(
  b: T.ResponseError
): b is T.ResponseNotOk {
  return b.kind === T.ErrorKind.ResponseNotOk;
}

export function okOrThrow<A>(b: T.BaseResponse<A>): A {
  if (b.isRight()) {
    return b.right;
  } else {
    throw asException(b.left);
  }
}

export function anyOkOrThrow<A>(b: RaceResult<A>): A {
  if (b.isRight()) {
    return b.right;
  } else {
    throw asException(b.left[0]);
  }
}

const kCommonHeaders = {
  'Connection': 'close',
   // 'Content-Type': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
  'Content-Type': Platform.select({ ios: 'application/form-data', android: 'multipart/form-data' }),
};

export async function getJson<O>(
  service: T.HttpClientService,
  uri: string,
  deserializer: T.Deserializer<O>
): Promise<T.BaseResponse<O>> {

  return service.requestAndDeserializeJson<O>(uri, {
    method: 'GET',
    headers: kCommonHeaders,
  }, deserializer);
}

export async function postJson<I, O>(
  service: T.HttpClientService,
  uri: string,
  payload: I,
  deserializer: T.Deserializer<O>
): Promise<T.BaseResponse<O>> {
  return service.requestAndDeserializeJson<O>(uri, {
    method: 'POST',
    headers: kCommonHeaders,
    // body: JSON.stringify(payload),
    body: formData(payload)
  }, deserializer);
}

export function formData(payload: any): FormData {
  let data = new FormData();
  if (Object.keys(payload).length > 0) {
    Object.keys(payload).map(key => {
      data.append(key, payload[key]);
    });
  } else {
    // for solve android body bug
    data.append('test', '123');
  }
  return data;
}


export function deserializationOk<A>(
  a: A
): T.DeserializationResult<A> {
  return Right.ofAny(a);
}

export function deserializationFailed<A>(
  e: Error
): T.DeserializationResult<A> {
  return Left.ofAny(e);
}

export function buildCannotDeserialize(
  error: any,
  rawResponse: T.RawResponse
): T.CannotDeserializeResponseBody {
  return {
    kind: T.ErrorKind.CannotDeserializeResponseBody,
    error,
    rawResponse,
  };
}

export function tryDeserialize<A>(
  resp: T.RawResponse,
  respJson: any,
  deserialize: T.Deserializer<A>
): T.BaseResponse<A> {
  let valueOrError: T.DeserializationResult<A>;
  try {
    valueOrError = deserialize(respJson, resp);
  } catch (e) {
    return Left.ofAny(buildCannotDeserialize(e, resp));
  }
  return valueOrError.fmapLeft(e => buildCannotDeserialize(e, resp));
}

export function buildResponseNotOk(
  rawResponse: T.RawResponse
): T.ResponseNotOk {
  return {
    kind: T.ErrorKind.ResponseNotOk,
    rawResponse,
  };
}

export function buildTimeoutError(
  timeoutMs: number
): T.TimeoutError {
  return {
    kind: T.ErrorKind.PossiblyTimedOut,
    timeoutMs,
  };
}

export function buildRequestError(
  error: any
): T.RequestError {
  return {
    kind: T.ErrorKind.RequestError,
    error,
  };
}

export function mkNetworkException(): T.Exception {
  return new T.Exception(T.ErrorKind.RequestError);
}

export function asException(r: T.ResponseError): T.Exception {
  if (isDeserializationError(r) || isResponseNotOk(r)) {
    return new T.Exception(r.kind, r.rawResponse);
  } else if (isRequestError(r) || isTimeoutError(r)) {
    return new T.Exception(r.kind);
  } else {
    return r;  // absurd
  }
}

export type RaceResult<A> = Either<RaceResultError, A>;
export type RaceResultError = T.ResponseError[];

export function getJsonAndRace<A>(
  service: T.HttpClientService,
  uris: string[],
  resultD: T.Deserializer<A>
): Promise<RaceResult<A>> {
  async function fetchJson(uri: string): Promise<T.BaseResponse<A>> {
    return getJson<A>(service, uri, resultD);
  }
  return Eithers.racePromises<T.ResponseError, A>(uris.map(fetchJson));
}

// XXX: Unsafe.
export function alwaysSucceedD<A>(r: A): T.DeserializationResult<A> {
  return deserializationOk(r);
}

export class RequestWrapper {
  constructor(private service: T.HttpClientService) {
  }

  getJsonAndRace<A>(uris: string[], resultD: T.Deserializer<A>): Promise<RaceResult<A>> {
    return getJsonAndRace<A>(this.service, uris, resultD);
  }

  postJson<I, O>(
    uri: string,
    payload: I,
    deserializer: T.Deserializer<O>
  ): Promise<T.BaseResponse<O>> {
    return postJson<I, O>(this.service, uri, payload, deserializer);
  }

  getJson<O>(
    uri: string,
    deserializer: T.Deserializer<O>
  ): Promise<T.BaseResponse<O>> {
    return getJson<O>(this.service, uri, deserializer);
  }
}
