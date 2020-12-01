// import
import gql from 'graphql-tag';

// definition
export const couponStatusFragment = gql`
  fragment couponStatusFragment on Order {
    id
    activityInfo {
      id
      plugin
      rule {
        discount {
          method
          value
        }
      }
      startTime
      endTime
      unlimitedDate
    }
    errorObj {
      code
      params {
        name
        value
      }
    }
  }
`;
