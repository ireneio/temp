// import
import gql from 'graphql-tag';

// definition
export const removeGmoCreditCard = gql`
  mutation removeGmoCreditCard {
    removeGmoCreditCard {
      status
    }
  }
`;

export const useRemoveGmoCreditCardFragment = gql`
  fragment useRemoveGmoCreditCardFragment on User {
    id
    hasGmoCreditCard
  }
`;
