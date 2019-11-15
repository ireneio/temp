// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { StoreAppMock } from './__generated__/StoreAppMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreAppMock on StoreApp {
    isInstalled
    plugin
  }
`;

export default mock.add<StoreAppMock>('StoreApp', [
  () => ({
    __typename: 'StoreApp',
    isInstalled: 1,
    plugin: 'returnOrder',
  }),
  () => ({
    __typename: 'StoreApp',
    isInstalled: 1,
    plugin: 'replacement',
  }),
]);
