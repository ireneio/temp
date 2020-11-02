// import
import mock from '../mock';

// graphql typescript
import { productIframeModuleMockFragment } from './gqls/__generated__/productIframeModuleMockFragment';

// definition
export default mock.add<productIframeModuleMockFragment>(
  'ProductIframeModule',
  [
    () =>
      ({
        __typename: 'ProductIframeModule',
        product: null,
      } as productIframeModuleMockFragment),
    () =>
      ({
        __typename: 'ProductIframeModule',
        product: {},
      } as productIframeModuleMockFragment),
  ],
);
