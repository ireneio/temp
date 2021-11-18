// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { priceFragment } from './price';
import { useProductsColumnsFragment } from './useProductsColumns';

// definition
export const cartOrderFragment = gql`
  fragment cartOrderFragment on Order {
    id
    categories {
      id
      products {
        id
        ...useProductsColumnsFragment
      }
    }

    ...priceFragment
  }

  ${localeFragment}
  ${priceFragment}
  ${useProductsColumnsFragment}
`;

export const getCartList = gql`
  query getCartList {
    getCartList {
      data {
        id
        ...cartOrderFragment
      }
    }
  }

  ${cartOrderFragment}
`;
