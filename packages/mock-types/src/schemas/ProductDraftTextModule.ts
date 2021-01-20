// import
import mock from '../mock';

// graphql typescript
import { productDraftTextModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<productDraftTextModuleMockFragment>(
  'ProductDraftTextModule',
  [
    () => ({
      __typename: 'ProductDraftTextModule',
      product: null,
    }),
    () => ({
      __typename: 'ProductDraftTextModule',
      product: {},
    }),
  ],
);
