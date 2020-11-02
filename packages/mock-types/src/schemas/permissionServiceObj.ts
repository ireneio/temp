// import
import mock from '../mock';

// graphql typescript
import { permissionServiceObjMockFragment } from './gqls/__generated__/permissionServiceObjMockFragment';

// definition
export default mock.add<permissionServiceObjMockFragment>(
  'permissionServiceObj',
  [
    () => ({
      __typename: 'permissionServiceObj',
      index: true,
      product: true,
    }),
    () => ({
      __typename: 'permissionServiceObj',
      index: false,
      product: false,
    }),
  ],
);
