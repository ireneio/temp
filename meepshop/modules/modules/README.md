# @meepshop/modules

Use to handle the all modules.

## How to add a new module

1. Create a default project, you can see [here](../../README.md#how-to-write-a-new-package).
2. Add `src/fragment.ts` in the new package:

```js
// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment /** module fragment */ on /** module type */ {
    id
    ... other fields
  }
`;
```

3. Add `mock.ts` in the new package:

```js
// import
import uuid from 'uuid/v4';

// graphql typescript
import { /** module fragment */ } from '@meepshop/types/gqls/meepshop';

// definition
export default {
  __typename: /** module type */,
  id: uuid(),
  ... other fields
};
```

4. Add `module` to `@meepshop/modules`:

```js
// package.json
{
  ...
  "/** module name, for example: @meepshop/module */": "^0.1.0"
  ...
}

// src/index.ts
...
import /** module fragment */ on '/** module name */lib/fragment';
...
export const modulesFragment = gql`
  ...
  ... on /** module type */ {
    __typename
    id
    parentId
    .../** module fragment */
  }
  ...
   ${/** module fragment */}
  ...
`
...
export default {
  ...
  /** module type */: dynamic(() => import('/** module name */')),
  ...
};

// src/context.tsc
...
const defaultContext = {
  ...
  /** module type */: {},
  ...
}
...
```

5. Modify `tsconfig.json`:

```js
{
  ...
  "paths": {
    ...
    "/** module path */lib/*": ["/** module path */src/*"],
    ...
  }
  ...
}
```

6. Add new mock data to `@meepshop/mock-types`:

```js
// schemas/** module type */.ts
// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { /** module type */Mock } from '@meepshop/types/gqls/meepshop';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment /** module type */Mock on /** module type */ {
    ...mock fileds
  }
`;

export default mock.add</** module type */Mock>('/** module type */', [
  () =>
    ({
      __typename: /** module type */,
      ... mock data
    }),
]);

// schemas/pageModule.ts
...
import /** module type */ from './** module type */';
...
gql`
  fragment PageModuleMock on PageModule {
    ...
    ... on /** module type */ {
      id
      parentId
    }
    ...
  }
`
...
export default mock.add<PageModuleMock[]>('PageModule', [
  ...
  () => getPageModules(/** module type */)
]);
```
