# @spec-box/text-parser

## Установка

```sh
npm i -PE @spec-box/text-parser
```

## Использование

```ts
import { parse } from '@spec-box/text-parser';

const text = 'При `нажатии` должен открывать диалог $dialog-name или ссылку https://xyz.com';
const result = parse(text);

// {
//   text: 'При `нажатии` должен открывать диалог $dialog-name или ссылку https://xyz.com',
//   meta: {
//     highlights: [{ raw: '`нажатии`', value: 'нажатии' }],
//     references: [{ raw: '$dialog-name', value: 'dialog-name' }],
//     urls: [{ raw: 'https://xyz.com', value: 'https://xyz.com' }]
//   }
// }
```
