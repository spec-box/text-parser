import { rules } from './assert-rules';

export interface ParsedValue {
  raw: string;
  value: string | undefined;
}

export interface ParseMeta {
  highlights: ParsedValue[];
  references: ParsedValue[];
  urls: ParsedValue[];
}

export interface ParseResult {
  assert: string;
  meta: ParseMeta;
}

/**
 * Parses assert string and return information about content.
 */
export function parse(assert: string) {
  const result: ParseResult = {
    assert,
    meta: { highlights: [], references: [], urls: [] },
  };

  pipe(
    extract(rules.highlight, result.meta.highlights),
    extract(rules.reference, result.meta.references),
    extract(rules.url, result.meta.urls),
  )(assert);

  return result;
}

function extract(regex: RegExp, values: ParsedValue[]) {
  return (value: string) => {
    for (const match of value.matchAll(regex)) {
      values.push({ raw: match.at(0) as string, value: match.at(1) });
      value = value.replace(match.at(0) as string, '');
    }

    return value;
  };
}

function pipe<T>(fn: (a: T) => T, ...fns: Array<(a: T) => T>) {
  return fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)), fn);
}
