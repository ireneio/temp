// import
import { gql } from '@apollo/client';

// definition
export const priceObjectTypeMockFragment = gql`
  fragment priceObjectTypeMockFragment on priceObjectType {
    total
    shipmentFee
    paymentFee
    currency
  }
`;
