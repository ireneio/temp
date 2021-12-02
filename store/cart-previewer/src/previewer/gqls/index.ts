// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { priceInPreviewerFragment } from './price';
import { useProductsColumnsInPreviewerFragment } from './useProductsColumns';

// definition
export const previewerFragment = gql`
  fragment previewerFragment on Order {
    id
    categories {
      id
      products {
        id
        ...useProductsColumnsInPreviewerFragment
      }
    }
    priceInfo {
      total
    }

    ...priceInPreviewerFragment
  }

  ${localeFragment}
  ${priceInPreviewerFragment}
  ${useProductsColumnsInPreviewerFragment}
`;

export const getCartListInPreviewer = gql`
  query getCartListInPreviewer {
    getCartList {
      data {
        id
        ...previewerFragment
      }
    }
  }

  ${previewerFragment}
`;
