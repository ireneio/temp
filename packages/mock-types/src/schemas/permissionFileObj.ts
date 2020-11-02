// import
import mock from '../mock';

// graphql typescript
import { permissionFileObjMockFragment } from './gqls/__generated__/permissionFileObjMockFragment';

// definition
export default mock.add<permissionFileObjMockFragment>('permissionFileObj', [
  () => ({
    __typename: 'permissionFileObj',
    index: true,
  }),
  () => ({
    __typename: 'permissionFileObj',
    index: false,
  }),
]);
