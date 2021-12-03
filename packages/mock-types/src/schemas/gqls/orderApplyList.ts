// import
import { gql } from '@apollo/client';

// definition
export const orderApplyListMockFragment = gql`
  fragment orderApplyListMockFragment on OrderApplyList {
    data {
      orderId
      orderProductId
      quantity
      status
    }
  }
`;
