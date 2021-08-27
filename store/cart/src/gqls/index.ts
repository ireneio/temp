// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { priceFragment } from './price';
import { useProductsColumnsFragment } from './useProductsColumns';

// definition
export const cartFragment = gql`
  fragment cartFragment on Order {
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
        ...cartFragment
      }
    }
  }

  ${cartFragment}
`;
