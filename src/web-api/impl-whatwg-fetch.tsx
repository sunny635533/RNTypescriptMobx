import { Left, } from '@src/util/type-level';
import { timeout } from '@src/util/promises';
import * as T from '@src/web-api/types';
import * as U from '@src/web-api/util';
import * as xml2js from 'xml2js';
import * as M from '@src/model';

export type SuccessCheck<O> = (jsonResult: M.BaseResponse<O>) => Promise<O>;


export class FetchService implements T.HttpClientService {
  constructor(private timeoutMs?: number, private successCheck?: SuccessCheck<any>, private sessionId?: string) {
  }

  withTimeout(timeoutMs?: number): T.HttpClientService {
    return new FetchService(timeoutMs);
  }

  updateSessionToken(sessionId: string): void {
    this.sessionId = sessionId;
  }

  private async request<O>(
    uri: string,
    request: T.RequestParams,
    processResponse: (r: Response) => Promise<T.BaseResponse<O>>
  ): Promise<T.BaseResponse<O>> {
    let resp: Response;
    const timeoutMs = this.timeoutMs || U.kDefaultTimeout;
    try {
      // NOTE: This can throw if no valid HTTP response is received.
      // The most usual exceptional cases are
      // - DNS resolution error
      // - Malformed URI
      // - TCP connection refused
      // - TLS handshake error
      // - Malformed HTTP response
      const respP = fetch(uri, request);

      // TODO: Use a real IO-level timeout mechanism.
      const mbTimedOut = await timeout(timeoutMs, respP);
      if (mbTimedOut.isLeft()) {
        return Left.ofAny(U.buildTimeoutError(timeoutMs));
      } else {
        resp = mbTimedOut.right;
      }
    } catch (e) {
      return Left.ofAny(U.buildRequestError(e));
    }
    if (resp.ok) {
      return await processResponse(resp);
    } else {
      return Left.ofAny(U.buildResponseNotOk(resp));
    }
  }

  async requestAndDeserializeJson<O>(
    uri: string,
    request: T.RequestParams,
    deserializer: T.Deserializer<O>
  ): Promise<T.BaseResponse<O>> {

    // update sessionId in header
    if (request.headers && this.sessionId) {
      request.headers = Object.assign(request.headers, { 'sessionId': this.sessionId });
    }

    return this.request(uri, request, async resp => {
      let respJson: any;
      // let valueOrError: T.DeserializationResult<O>;
      try {
        if (this.successCheck) {
          respJson = await this.successCheck(await resp.json());

          console.log('=========== url: ' + uri);
          console.log('   ======== params: ' + JSON.stringify(request.body));
          console.log('   ======== result: ' + JSON.stringify(respJson));

          return U.tryDeserialize<O>(resp, respJson, deserializer);
        } else {
          return U.tryDeserialize<O>(resp, await resp.json(), deserializer);
        }
      } catch (e) {
        return Left.ofAny(U.buildCannotDeserialize(e, resp));
      }
    });
  }

  async requestAndDeserializeXml<O>(
    uri: string,
    request: T.RequestParams,
    deserializer: T.Deserializer<O>
  ): Promise<T.BaseResponse<O>> {

    return this.request(uri, request, async resp => {
      try {
        const text = await resp.text();
        const respXml = await new Promise<any>((k, ek) => {
          xml2js.parseString(text, (err, resp) => {
            if (err) {
              ek(err);
            } else {
              k(resp);
            }
          });
        });
        return U.tryDeserialize<O>(resp, respXml, deserializer);
      } catch (e) {
        return Left.ofAny(U.buildCannotDeserialize(e, resp));
      }
    });
  }

}
