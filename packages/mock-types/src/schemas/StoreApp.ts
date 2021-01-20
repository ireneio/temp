// import
import mock from '../mock';

// graphql typescript
import { storeAppMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<storeAppMockFragment>('StoreApp', [
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
  () => ({
    __typename: 'StoreApp',
    isInstalled: 1,
    plugin: 'coupon',
  }),
]);
