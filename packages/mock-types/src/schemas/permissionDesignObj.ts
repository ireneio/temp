// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { permissionDesignObjMock } from './__generated__/permissionDesignObjMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment permissionDesignObjMock on permissionDesignObj {
    index
  }
`;

export default mock.add<permissionDesignObjMock>('permissionDesignObj', [
  () => ({
    __typename: 'permissionDesignObj',
    index: true,
  }),
  () => ({
    __typename: 'permissionDesignObj',
    index: false,
  }),
]);
