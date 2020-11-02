// import
import gql from 'graphql-tag';

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
