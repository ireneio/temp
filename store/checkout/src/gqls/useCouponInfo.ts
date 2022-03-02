// import
import { gql } from '@apollo/client';

// definition
export const useCouponInfoFragment = gql`
  fragment useCouponInfoFragment on Activity {
    plugin
    rule {
      discount {
        method
        value
      }
    }
    unlimitedDate
    startTime
    endTime
  }
`;
