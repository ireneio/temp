// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const titleVariantFragment = gql`
  fragment titleVariantFragment on Variant {
    id
    listPrice
    suggestedPrice
    totalPrice
  }
`;

export const titleProductFragment = gql`
  fragment titleProductFragment on Product {
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
      ...titleVariantFragment
    }
  }

  ${thumbnailFragment}
  ${localeFragment}

  ${titleVariantFragment}
`;
