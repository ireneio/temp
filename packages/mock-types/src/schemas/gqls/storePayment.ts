// import
import { gql } from '@apollo/client';

// definition
export const storePaymentMockFragment = gql`
  fragment storePaymentMockFragment on StorePayment {
    title {
      zh_TW
    }
  }
`;
