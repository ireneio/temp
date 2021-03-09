// import
import gql from 'graphql-tag';

// graphql import
import { productSpecSelectorFragment } from '@meepshop/product-spec-selector/gqls';

import { titleProductFragment } from './title';

// definition
export const mobileSpecSelectorFragment = gql`
  fragment mobileSpecSelectorFragment on Product {
    id

    variants {
      id
      minPurchaseItems
      maxPurchaseLimit
    }

    ...productSpecSelectorFragment
    ...titleProductFragment
  }

  ${titleProductFragment}
  ${productSpecSelectorFragment}
`;
