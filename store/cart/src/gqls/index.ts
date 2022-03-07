// import
import { gql } from '@apollo/client';

// graphql import
import { alertFragment } from './alert';
import { productsUserFragment } from './products';
import { upsellingUserFragment } from '../upselling/gqls';
import { useComputedCartFragment } from './useComputedCart';

// definition
export const getCart = gql`
  query getCart {
    viewer {
      id
      store {
        id
        activeUpsellingArea {
          id
          ...alertFragment
        }
      }
      ...productsUserFragment
      ...upsellingUserFragment
      ...useComputedCartFragment
    }
  }

  ${alertFragment}
  ${productsUserFragment}
  ${upsellingUserFragment}
  ${useComputedCartFragment}
`;
