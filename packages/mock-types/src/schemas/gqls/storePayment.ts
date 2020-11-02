// import
import gql from 'graphql-tag';

// definition
export const storePaymentMockFragment = gql`
  fragment storePaymentMockFragment on StorePayment {
    title {
      zh_TW
    }
  }
`;
