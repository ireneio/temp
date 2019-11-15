// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { permissionServiceObjMock } from './__generated__/permissionServiceObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionServiceObjMock on permissionServiceObj {
    index
    product
  }
`;

export default mock.add<permissionServiceObjMock>('permissionServiceObj', [
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
]);
