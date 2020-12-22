// import
import gql from 'graphql-tag';

// graphql import
import { useOptionsVariantFragment } from './useOptions';

// definition
export const productAmountSelectFragment = gql`
  fragment productAmountSelectFragment on Variant {
    id
    ...useOptionsVariantFragment
  }

  ${useOptionsVariantFragment}
`;
