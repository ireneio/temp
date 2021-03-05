// import
import gql from 'graphql-tag';

// definition
export const exchangeRateMockFragment = gql`
  fragment exchangeRateMockFragment on ExchangeRate {
    base
    rates
    updatedAt
  }
`;
