// import
import { gql } from '@apollo/client';

// definition
export const orderProductDeltaMockFragment = gql`
  fragment orderProductDeltaMockFragment on OrderProductQuantityDelta {
    sku
    name
    specs {
      title {
        zh_TW
      }
    }
    beforeQuantity
    afterQuantity
  }
`;
