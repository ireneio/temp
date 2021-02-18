// import
import gql from 'graphql-tag';

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
