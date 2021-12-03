// import
import { gql } from '@apollo/client';

// definition
export const exchangeRateMockFragment = gql`
  fragment exchangeRateMockFragment on ExchangeRate {
    base
    rates
    updatedAt
  }
`;
