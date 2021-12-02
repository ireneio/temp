// import
import { gql } from '@apollo/client';

// definition
export const useInitFxFragment = gql`
  fragment useInitFxFragment on ExchangeRate {
    base
    rates
    updatedAt
  }
`;
