// import
import gql from 'graphql-tag';

// definition
export const creditFragment = gql`
  fragment creditFragment on paymentInfoType {
    id
    list {
      id
      card4no
    }
  }
`;
