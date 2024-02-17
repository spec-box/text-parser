import { describe, expect, test } from '@jest/globals';

import { parse } from '../assert-parser';

describe('assert-parser', () => {
  test('должен возвращать оригинальный текст', () => {
    const result = parse('Lorem ipsum dolor sit amet consectetur adipisicing elit.');

    expect(result.assert).toBe('Lorem ipsum dolor sit amet consectetur adipisicing elit.');
  });

  test('должен возвращать все выделения', () => {
    const result = parse('Lorem `ipsum` dolor `sit \\` amet` consectetur adipisicing elit.');

    expect(result.meta.highlights).toEqual([
      { raw: '`ipsum`', value: 'ipsum' },
      { raw: '`sit \\` amet`', value: 'sit \\` amet' },
    ]);
  });

  test('должен возвращать все отсылки', () => {
    const result = parse('Lorem $ipsum dolor $sit-amet consectetur adipisicing elit.');

    expect(result.meta.references).toEqual([
      { raw: '$ipsum', value: 'ipsum' },
      { raw: '$sit-amet', value: 'sit-amet' },
    ]);
  });

  test('должен возвращать все ссылки', () => {
    const result = parse(
      'Lorem https://ipsum.com?dolor http://sit-amet.com?retpath=https://consectetur.com adipisicing elit.',
    );

    expect(result.meta.urls).toEqual([
      { raw: 'https://ipsum.com?dolor', value: undefined },
      { raw: 'http://sit-amet.com?retpath=https://consectetur.com', value: undefined },
    ]);
  });
});
