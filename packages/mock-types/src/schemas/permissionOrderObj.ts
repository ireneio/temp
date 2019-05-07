// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { permissionOrderObjMock } from './__generated__/permissionOrderObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionOrderObjMock on permissionOrderObj {
    index
    paymentStatus
    shipmentStatus
    status
    create
    export
  }
`;

export default mock.add<permissionOrderObjMock>('permissionOrderObj', [
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
