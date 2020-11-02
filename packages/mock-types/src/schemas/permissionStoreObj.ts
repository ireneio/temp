// import
import mock from '../mock';

// graphql typescript
import { permissionStoreObjMockFragment } from './gqls/__generated__/permissionStoreObjMockFragment';

// definition
export default mock.add<permissionStoreObjMockFragment>('permissionStoreObj', [
  () => ({
    __typename: 'permissionStoreObj',
    index: true,
    payment: true,
    shipment: true,
    exportSetting: true,
  }),
  () => ({
    __typename: 'permissionStoreObj',
    index: false,
    payment: false,
    shipment: false,
    exportSetting: false,
  }),
]);
