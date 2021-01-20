// import
import mock from '../mock';

// graphql typescript
import { permissionUserObjMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<permissionUserObjMockFragment>('permissionUserObj', [
  () => ({
    __typename: 'permissionUserObj',
    index: true,
    create: true,
    update: true,
    remove: true,
    export: true,
  }),
  () => ({
    __typename: 'permissionUserObj',
    index: false,
    create: false,
    update: false,
    remove: false,
    export: false,
  }),
]);
