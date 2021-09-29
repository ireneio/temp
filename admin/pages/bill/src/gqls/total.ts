// import
import gql from 'graphql-tag';

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
