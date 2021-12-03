// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const productFragment = gql`
  fragment productFragment on Product {
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
      listPrice
      suggestedPrice
      totalPrice
    }
  }

  ${localeFragment}
  ${thumbnailFragment}
`;
