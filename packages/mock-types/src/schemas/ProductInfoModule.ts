// import
import mock from '../mock';

// graphql typescript
import { productInfoModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<productInfoModuleMockFragment>('ProductInfoModule', [
  () => ({
    __typename: 'ProductInfoModule',
    drawerOnMobile: true,
    unfoldedVariantsOnMobile: true,
    unfoldedVariants: true,
    product: null,
  }),
  () => ({
    __typename: 'ProductInfoModule',
    drawerOnMobile: false,
    unfoldedVariantsOnMobile: false,
    unfoldedVariants: false,
    product: {},
  }),
]);
