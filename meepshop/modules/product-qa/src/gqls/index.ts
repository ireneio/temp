// import
import { gql } from '@apollo/client';

// graphql import
import { useCreateProductQAFragment } from './useCreateProductQA';

// definition
export const productQaFragment = gql`
  fragment productQaFragment on ProductQaModule {
    id
    width
    product {
      id
      publicViewableQas {
        userEmail
        qa {
          id
          question
          createdAt
        }
      }
      ...useCreateProductQAFragment
    }

    viewer {
      id
      role
    }
  }

  ${useCreateProductQAFragment}
`;
