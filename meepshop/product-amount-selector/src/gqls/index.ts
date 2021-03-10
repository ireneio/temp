// import
import gql from 'graphql-tag';

// graphql import
import { useOptionsVariantFragment } from './useOptions';

// definition
export const productAmountSelectorFragment = gql`
  fragment productAmountSelectorFragment on Variant {
    id
    ...useOptionsVariantFragment
  }

  ${useOptionsVariantFragment}
`;
