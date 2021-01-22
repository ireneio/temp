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

export const useRemoveGmoCreditCardUpdateCache = gql`
  fragment useRemoveGmoCreditCardUpdateCache on User {
    id
    hasGmoCreditCard
  }
`;
