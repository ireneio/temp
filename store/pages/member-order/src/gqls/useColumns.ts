// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const useColumnsMemberOrderFragment = gql`
  fragment useColumnsMemberOrderFragment on productsObjectType {
    id
    coverImage {
      id
      ...thumbnailFragment
    }
    title {
      ...localeFragment
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
    type
    stock
    quantity
    retailPrice
  }

  ${thumbnailFragment}
  ${localeFragment}
`;
