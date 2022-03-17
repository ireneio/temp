// import
import { gql } from '@apollo/client';

// graphql import
import { useProductsColumnsFragment } from '@admin/products-selector/gqls';

// definition
export const useProgramInitialValuesFragment = gql`
  fragment useProgramInitialValuesFragment on AffiliateProgram {
    id
    title
    startAt
    endAt
    affiliatePartner {
      id
    }
    commissionRate
    allProducts
    products {
      id
      ...useProductsColumnsFragment
    }
    promoCode
  }

  ${useProductsColumnsFragment}
`;
