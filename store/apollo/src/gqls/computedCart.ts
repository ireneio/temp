// import
import gql from 'graphql-tag';

// difinition
export const computedCartLineItemFragment = gql`
  fragment computedCartLineItemFragment on LineItem {
    id
    discountAllocations {
      activityId: id
      discountPrice
    }
  }
`;
