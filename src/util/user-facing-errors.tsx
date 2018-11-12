import * as WebApi from '@src/web-api/types';
import { Alert } from 'react-native';
import { LocalizedErrorMap, ErasedErrorMap, AlertSpec } from '@src/main/strings';

// Presents an internal error identifier by turning it into an user-facing error message.
export function presentErrorAsAlert(errorName: string, errorMap: LocalizedErrorMap) {
  const e = renderError(errorName, errorMap);
  Alert.alert(e.title, e.body);
}

export function presentExceptionAsAlert(e: any, errorMap: LocalizedErrorMap) {
  const ex = renderSomeException(e, errorMap);
  Alert.alert(ex.title, ex.body);
}

export function renderError(errorName: string, errorMap: LocalizedErrorMap): AlertSpec {
  let spec = (errorMap as ErasedErrorMap)[errorName];
  if (!spec) {
    spec = errorMap.__default__;
  }
  let errorCode;
  switch (errorName) {
    case 'X86NotSupported': errorCode = 201; break;
    case 'CannotDeserializeResponseBody': errorCode = 301; break;
    case 'ResponseNotOk': errorCode = 302; break;
    case 'PossiblyTimedOut': errorCode = 303; break;
    case 'RequestError': errorCode = 304; break;
    default: errorCode = 401; break;
  }
  const body = spec.body ? spec.body + ' ' : '';
  return {
    title: spec.title,
    body: `${body}(${errorCode})`,
    ok: spec.ok
  };
}

export function renderSomeException(e: any, emap: LocalizedErrorMap): AlertSpec {
  let errorName: string;
  if (WebApi.isException(e)) {
    errorName = WebApi.ErrorKinds.show(e.kind);
  } else {
    console.warn(`Really unknown exception: ${e}`);
    errorName = '::UnknownException';
  }
  return renderError(errorName, emap);
}
