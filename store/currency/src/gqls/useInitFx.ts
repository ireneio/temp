// import
import gql from 'graphql-tag';

// definition
export const useInitFxFragment = gql`
  fragment useInitFxFragment on ExchangeRate {
    base
    rates
    updatedAt
  }
`;
