// import
import gql from 'graphql-tag';

// graphql import
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';

// definition
export const quantityVariantFragment = gql`
  fragment quantityVariantFragment on Variant {
    id
    ...productAmountSelectorFragment
  }

  ${productAmountSelectorFragment}
`;

export const quantityProductInfoModuleFragment = gql`
  fragment quantityProductInfoModuleFragment on ProductInfoModule {
    id
    unfoldedVariants
  }
`;
