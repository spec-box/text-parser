# @spec-box/assert-parser

## Установка

```sh
npm i -PE @spec-box/assert-parser
```

## Использование

```ts
import { parse } from '@spec-box/assert-parser';

const assert = 'При `нажатии` должен открывать диалог $dialog-name или ссылку https://xyz.com';
const result = parse(assert);

// {
//   assert: 'При `нажатии` должен открывать диалог $dialog-name или ссылку https://xyz.com',
//   meta: {
//     highlights: [{ raw: '`нажатии`', value: 'нажатии' }],
//     references: [{ raw: '$dialog-name', value: 'dialog-name' }],
//     urls: [{ raw: 'https://xyz.com', value: undefined }]
//   }
// }
```
