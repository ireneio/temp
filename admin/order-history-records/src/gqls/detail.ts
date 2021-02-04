// import
import gql from 'graphql-tag';

// definition
export const detailFragment = gql`
  fragment detailFragment on OrderAuditLog {
    orderProductQuantityDelta {
      sku
      name
      specs
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
    totalAmountDelta {
      before
      after
    }
  }
`;
