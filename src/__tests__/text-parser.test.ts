import { describe, expect, test } from '@jest/globals';

import { parse } from '../text-parser';

describe('text-parser', () => {
  test('должен возвращать оригинальный текст', () => {
    const result = parse('Lorem ipsum dolor sit amet consectetur adipisicing elit.');

    expect(result.text).toBe('Lorem ipsum dolor sit amet consectetur adipisicing elit.');
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

  test('не должен возвращать отсылки внутри выделений', () => {
    const result = parse('`Lorem $ipsum-com` dolor');

    expect(result.meta.references).toHaveLength(0);
  });

  test('должен возвращать все ссылки', () => {
    const result = parse(
      'Lorem https://ipsum.com?dolor http://sit-amet.com?retpath=https://consectetur.com adipisicing elit.',
    );

    expect(result.meta.urls).toEqual([
      { raw: 'https://ipsum.com?dolor', value: 'https://ipsum.com?dolor' },
      {
        raw: 'http://sit-amet.com?retpath=https://consectetur.com',
        value: 'http://sit-amet.com?retpath=https://consectetur.com',
      },
    ]);
  });

  test('не должен возвращать ссылки без протокола', () => {
    const result = parse('Lorem.ipsum.dolor sit amet consectetur adipisicing elit.');

    expect(result.meta.urls).toHaveLength(0);
  });

  test('не должен возвращать ссылки внутри выделений', () => {
    const result = parse('`Lorem https://ipsum.com` dolor');

    expect(result.meta.urls).toHaveLength(0);
  });
});
