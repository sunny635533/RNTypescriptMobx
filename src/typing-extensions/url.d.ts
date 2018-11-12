declare module 'url' {
  export interface Url {
    protocol: string;
    host: string;
    auth: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    path: string;
    query: string | {[key: string]: string};
    hash: string;
  }

  export interface ParsedUrl extends Url {
    href: string;
  }

  export function parse(urlStr: string,
                        parseQueryString?: boolean,
                        slashesDenoteHost?: boolean): ParsedUrl;

  export function format(url: Url): string;
}

