// import
import gql from 'graphql-tag';

// graphql typescript
import { productQaUserFragment as productQaUserFragmentType } from './__generated__/productQaUserFragment';

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

export default gql`
  fragment productQaFragment on ProductQaModule {
    id
    width
    product(productId: $productId) {
      id
      publicViewableQas {
        userEmail
        qa {
          id
          question
          createdAt
        }
      }
    }
  }
`;
