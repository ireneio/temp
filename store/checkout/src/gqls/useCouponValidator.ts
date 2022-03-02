// import
import { gql } from '@apollo/client';

// definition
export const useCouponValidatorFragment = gql`
  fragment useCouponValidatorFragment on ErrorInfo {
    code
    params {
      name
      value
    }
  }
`;
