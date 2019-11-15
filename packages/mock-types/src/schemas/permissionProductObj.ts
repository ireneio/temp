// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { permissionProductObjMock } from './__generated__/permissionProductObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionProductObjMock on permissionProductObj {
    index
    create
    update
    remove
    cost
    export
  }
`;

export default mock.add<permissionProductObjMock>('permissionProductObj', [
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
]);
