// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { permissionFileObjMock } from './__generated__/permissionFileObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionFileObjMock on permissionFileObj {
    index
  }
`;

export default mock.add<permissionFileObjMock>('permissionFileObj', [
  () => ({
    __typename: 'permissionFileObj',
    index: true,
  }),
  () => ({
    __typename: 'permissionFileObj',
    index: false,
  }),
]);
