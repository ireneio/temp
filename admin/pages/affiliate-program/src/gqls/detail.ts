// import
import { gql } from '@apollo/client';

// graphql import
import { useProductsColumnsFragment } from '@admin/products-selector/gqls';

import { promoCodeExampleFragment } from './promoCodeExample';

// definition
export const getProgramDetail = gql`
  query getProgramDetail($id: ID!) {
    viewer {
      id
      affiliateProgram(id: $id) {
        id
        title
        startAt
        endAt
        status
        affiliatePartner {
          id
          name
        }
        commissionRate
        allProducts
        products {
          id
          ...useProductsColumnsFragment
        }
        promoCode
      }
      store {
        id
        ...promoCodeExampleFragment
      }
    }
  }

  ${useProductsColumnsFragment}
  ${promoCodeExampleFragment}
`;
