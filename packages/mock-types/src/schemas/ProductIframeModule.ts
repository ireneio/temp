// import
import mock from '../mock';

// graphql typescript
import { productIframeModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<productIframeModuleMockFragment>(
  'ProductIframeModule',
  [
    () => ({
      __typename: 'ProductIframeModule',
      product: null,
    }),
    () => ({
      __typename: 'ProductIframeModule',
      product: {},
    }),
  ],
);
