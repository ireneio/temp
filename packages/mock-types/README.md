# @meepshop/mock-types

This package is used to mock `apollo-client` request result.

## How to use in a component

1. Run `yarn schema` to download the schema for the mock types.
2. Use `MockTypes` like this:

```js
import MockTypes from '@meepshop/mock-types';

...
<MockTypes>
  <Component />
</MockTypes>
...
```

3. You can remove `schema.json` by using `yarn clean`.

## How to use in unit testing

```js
import runTest from '@meepshop/mock-types/src/runTest';

runTest(<Component />);
```

If you need to test some functions like `onClick`, you can use like this:

```js
import { ReactWrapper } from 'enzyme';

...
runTest(<Component />, (wrapper: ReactWrapper<unknown, unknown>) => {
  // write testing with enzyme for those functions.
});
```

## How to write a new mock schema type

1. Write a new schema file in [./src/schemas](./src/schemas), and copy this:

```js
import { gql } from 'apollo-boost';

import mock from '../mock';
import { /** fragment name */ } from './__generated__//** fragment name */';

// eslint-disable-next-line no-unused-expressions
gql`
  fragment /** fragment name */ on /** schema type */ {
    /** mock fields */
  }
`;

export default mock.add</** fragment name */>('/** schema type */', [
  () => ({
    __typename: '/** schema type */',
    /** mock fields result */
  }),
]);
```

In this file, `gql` is used to build the schema type with `apollo`. In the array of the mock function, each of item in array is a `graphql` resolver function. You can get the same arguments as `garphql` resolver function.

2. Add the new schema type in [./src/schema.ts](./src/schema.ts), and add this:

```js
...
import /** schema type */ from './schema//**schema type */';
...
mocks: {
  /** schema type */,
}
...
```

## How this package work

In [./src/index.tsx](./src/index.tsx), this exports a component which provide `network` of `apollo-client`, and this network use `apollo-link-schema` and [./src/schema.ts](./src/schema.ts) to build a graphql response.
