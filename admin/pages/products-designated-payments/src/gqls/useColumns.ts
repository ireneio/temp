// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@admin/thumbnail/gqls';

// definition
export const useColumnsProductFragment = gql`
  fragment useColumnsProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    coverImage {
      id
      ...thumbnailFragment
    }
    variants {
      id
      sku
    }
  }

  ${localeFragment}
  ${thumbnailFragment}
`;
