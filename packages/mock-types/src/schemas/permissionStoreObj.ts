// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { permissionStoreObjMock } from './__generated__/permissionStoreObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionStoreObjMock on permissionStoreObj {
    index
    payment
    shipment
    exportSetting
  }
`;

export default mock.add<permissionStoreObjMock>('permissionStoreObj', [
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
