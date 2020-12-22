// import
import gql from 'graphql-tag';

// definition
export const orderProductDeltaMockFragment = gql`
  fragment orderProductDeltaMockFragment on OrderProductDelta {
    sku
    name
    spec
    beforeQuantity
    afterQuantity
  }
`;
