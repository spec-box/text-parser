import { rules } from './text-rules';

export interface ParsedValue {
  raw: string;
  value: string;
}

export interface ParseMeta {
  highlights: ParsedValue[];
  references: ParsedValue[];
  urls: ParsedValue[];
}

export interface ParseResult {
  text: string;
  meta: ParseMeta;
}

/**
 * Parses text and return information about content.
 */
export function parse(text: string) {
  const result: ParseResult = {
    text,
    meta: { highlights: [], references: [], urls: [] },
  };

  pipe(
    extract(rules.highlight, result.meta.highlights),
    extract(rules.reference, result.meta.references),
    extract(rules.url, result.meta.urls),
  )(text);

  return result;
}

function extract(regex: RegExp, values: ParsedValue[]) {
  return (value: string) => {
    for (const match of value.matchAll(regex)) {
      const raw = match.at(0) as string;

      values.push({ raw, value: match.at(1) ?? raw });
      value = value.replace(raw, '');
    }

    return value;
  };
}

function pipe<T>(fn: (a: T) => T, ...fns: Array<(a: T) => T>) {
  return fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)), fn);
}
