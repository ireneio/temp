// import
import gql from 'graphql-tag';

// definition
export const createProductQA = gql`
  mutation createProductQA($createProductQA: [NewProductQA]) {
    createProductQA(createProductQA: $createProductQA) {
      id
      userEmail
      qa {
        id
        question
        createdAt
      }
    }
  }
`;

export const useCreateProductQAFragment = gql`
  fragment useCreateProductQAFragment on Product {
    id
    publicViewableQas {
      __typename
      userEmail
      qa {
        __typename
        id
        question
        createdAt
      }
    }
  }
`;
