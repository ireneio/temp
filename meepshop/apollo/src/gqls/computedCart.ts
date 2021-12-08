// import
import { gql } from '@apollo/client';

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
