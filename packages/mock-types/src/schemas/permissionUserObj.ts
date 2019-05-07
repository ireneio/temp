// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { permissionUserObjMock } from './__generated__/permissionUserObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionUserObjMock on permissionUserObj {
    index
    create
    update
    remove
    export
  }
`;

export default mock.add<permissionUserObjMock>('permissionUserObj', [
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
