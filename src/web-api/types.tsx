import { Either } from '@src/util/type-level';

// For IoC.
export interface HttpClientService {
  withTimeout(timeoutMs?: number): HttpClientService;

  requestAndDeserializeJson<O>(
    uri: string,
    request: RequestParams,
    deserializer: Deserializer<O>
  ): Promise<BaseResponse<O>>;

  requestAndDeserializeXml<O>(
    uri: string,
    request: RequestParams,
    deserializer: Deserializer<O>
  ): Promise<BaseResponse<O>>;
}

// Based on fetch.
export interface RequestParams {
  method?: string;
  headers?: { [index: string]: string };
  // body?: string;
  body?: FormData;
}

export type BaseResponse<A> = Either<ResponseError, A>;

interface ResponseErrorBase {
  kind: ErrorKind;
}

export type ResponseError
  = CannotDeserializeResponseBody
  | ResponseNotOk
  | TimeoutError
  | RequestError;

export interface CannotDeserializeResponseBody extends ResponseErrorBase {
  error: any;
  rawResponse: RawResponse;
}

export interface ResponseNotOk extends ResponseErrorBase {
  rawResponse: RawResponse;
}

export interface TimeoutError extends ResponseErrorBase {
  timeoutMs: number;
}

export interface RequestError extends ResponseErrorBase {
  error: any;
}

export interface RawResponse {
  ok: boolean;
  status: number;
}

export type DeserializationResult<A> = Either<Error, A>;
export type Deserializer<A> = (r: any, raw: RawResponse) => DeserializationResult<A>;

export const enum ErrorKind {
  CannotDeserializeResponseBody,
  ResponseNotOk,
  // `Possibly` since we cannot be 100% sure that the remote host haven't received
  // our request and completed the transaction.
  PossiblyTimedOut,
  RequestError,
}

export namespace ErrorKinds {
  // i.e., the remote server might have received our request.
  export function requestPossiblySent(e: ErrorKind) {
    switch (e) {
      case ErrorKind.CannotDeserializeResponseBody:
      case ErrorKind.ResponseNotOk:
      case ErrorKind.PossiblyTimedOut:
        return true;
      case ErrorKind.RequestError:
        return false;
    }
  }

  // We desperately need better support for compile-time code generation!
  export function show(e: ErrorKind) {
    switch (e) {
      case ErrorKind.CannotDeserializeResponseBody:
        return 'CannotDeserializeResponseBody';
      case ErrorKind.ResponseNotOk:
        return 'ResponseNotOk';
      case ErrorKind.PossiblyTimedOut:
        return 'PossiblyTimedOut';
      case ErrorKind.RequestError:
        return 'RequestError';
    }
  }
}

export class Exception {
  name: string;
  message: string;

  kind: ErrorKind;
  rawResponse: RawResponse | undefined;

  constructor(kind: ErrorKind, rawResponse?: RawResponse) {
    this.kind = kind;
    this.rawResponse = rawResponse;
  }

  toString() {
    return `ApiResponse.Exception: kind = ${this.kind}, rawResponse = ${JSON.stringify(this.rawResponse)}`;
  }
}

export function isException(e: any): e is Exception {
  return e instanceof Exception;
}

// i.e., the remote server might have received our request.
export async function isNonfatalNetworkException(anyE: any) {
  if (isException(anyE)) {
    const e = anyE as Exception;
    if (ErrorKinds.requestPossiblySent(e.kind)) {
      return true;
    }
  }
  return false;
}
