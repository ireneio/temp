// import
import gql from 'graphql-tag';

// graphql import
import { useVariantsTreeFragment } from '@meepshop/hooks/lib/gqls/useVariantsTree';

import { titleProductFragment } from './title';

// definition
export const productSpecSeletorFragment = gql`
  fragment productSpecSeletorFragment on Product {
    id

    variants {
      id
      minPurchaseItems
      maxPurchaseLimit
    }

    ...useVariantsTreeFragment
    ...titleProductFragment
  }

  ${useVariantsTreeFragment}
  ${titleProductFragment}
`;
