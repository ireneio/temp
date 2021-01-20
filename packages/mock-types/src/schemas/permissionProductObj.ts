// import
import mock from '../mock';

// graphql typescript
import { permissionProductObjMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<permissionProductObjMockFragment>(
  'permissionProductObj',
  [
    () => ({
      __typename: 'permissionProductObj',
      index: true,
      create: true,
      update: true,
      remove: true,
      cost: true,
      export: true,
    }),
    () => ({
      __typename: 'permissionProductObj',
      index: false,
      create: false,
      update: false,
      remove: false,
      cost: false,
      export: false,
    }),
  ],
);
