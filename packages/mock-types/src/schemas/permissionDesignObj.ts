// import
import mock from '../mock';

// graphql typescript
import { permissionDesignObjMockFragment } from './gqls/__generated__/permissionDesignObjMockFragment';

// definition
export default mock.add<permissionDesignObjMockFragment>(
  'permissionDesignObj',
  [
    () => ({
      __typename: 'permissionDesignObj',
      index: true,
    }),
    () => ({
      __typename: 'permissionDesignObj',
      index: false,
    }),
  ],
);
