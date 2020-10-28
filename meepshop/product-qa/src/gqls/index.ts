// import
import gql from 'graphql-tag';

// graphql typescript
import { productQaUserFragment as productQaUserFragmentType } from './__generated__/productQaUserFragment';

// graphql import
import { useCreateProductQAFragment } from './useCreateProductQA';

// typescript definition
export interface ContextType {
  user: productQaUserFragmentType | null;
}

// definition
export const productQaUserFragment = gql`
  fragment productQaUserFragment on User {
    id
    role
  }
`;

export const productQaProductQaModuleFragment = gql`
  fragment productQaProductQaModuleFragment on ProductQaModule {
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
  }

  ${useCreateProductQAFragment}
`;
