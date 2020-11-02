// import
import mock from '../mock';

// graphql typescript
import { productDraftTextModuleMockFragment } from './gqls/__generated__/productDraftTextModuleMockFragment';

// definition
export default mock.add<productDraftTextModuleMockFragment>(
  'ProductDraftTextModule',
  [
    () =>
      ({
        __typename: 'ProductDraftTextModule',
        product: null,
      } as productDraftTextModuleMockFragment),
    () =>
      ({
        __typename: 'ProductDraftTextModule',
        product: {},
      } as productDraftTextModuleMockFragment),
  ],
);
