// import
import { gql } from '@apollo/client';

// graphql import
import { useCouponInfoFragment } from './useCouponInfo';
import { useCouponValidatorFragment } from './useCouponValidator';

// definition
export const couponFragment = gql`
  fragment couponFragment on Order {
    id
    activityInfo {
      ...useCouponInfoFragment
    }
    errorObj {
      ...useCouponValidatorFragment
    }
  }

  ${useCouponInfoFragment}
  ${useCouponValidatorFragment}
`;
