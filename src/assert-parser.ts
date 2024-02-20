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

  extract(assert, rules.highlight, result.meta.highlights);
  extract(assert, rules.reference, result.meta.references);
  extract(assert, rules.url, result.meta.urls);

  return result;
}

function extract(value: string, regex: RegExp, values: ParsedValue[]) {
  for (const match of value.matchAll(regex)) {
    values.push({ raw: match.at(0) as string, value: match.at(1) });
  }
}
