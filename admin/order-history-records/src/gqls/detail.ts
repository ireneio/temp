// import
import gql from 'graphql-tag';

// definition
export const detailFragment = gql`
  fragment detailFragment on OrderHistoryRecord {
    productsChangeDelta {
      sku
      name
      spec
      beforeQuantity
      afterQuantity
    }
    productsAmountDelta {
      before
      after
    }
    adjustAmountDelta {
      before
      after
    }
    orderTotalAmountDelta {
      before
      after
    }
  }
`;
