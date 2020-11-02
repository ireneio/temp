// import
import mock from '../mock';

// graphql typescript
import { permissionOrderObjMockFragment } from './gqls/__generated__/permissionOrderObjMockFragment';

// definition
export default mock.add<permissionOrderObjMockFragment>('permissionOrderObj', [
  () => ({
    __typename: 'permissionOrderObj',
    index: true,
    paymentStatus: true,
    shipmentStatus: true,
    status: true,
    create: true,
    export: true,
  }),
  () => ({
    __typename: 'permissionOrderObj',
    index: false,
    paymentStatus: false,
    shipmentStatus: false,
    status: false,
    create: false,
    export: false,
  }),
]);
