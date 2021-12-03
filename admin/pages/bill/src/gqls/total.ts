// import
import { gql } from '@apollo/client';

// definition
export const totalFragment = gql`
  fragment totalFragment on StoreBill {
    id
    currency
    fxRate
    totalFee
    localTotalFee
  }
`;
