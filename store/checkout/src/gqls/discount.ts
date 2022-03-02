// import
import { gql } from '@apollo/client';

// graphql import
import { couponFragment } from './coupon';

// definition
export const discountFragment = gql`
  fragment discountFragment on Order {
    id
    priceInfo {
      userPoints
      canUsePointsLimit
    }
    ...couponFragment
  }

  ${couponFragment}
`;
