// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

import { modalProductFragment, modalLineItemFragment } from './modal';
import {
  useAddToCartProductFragment,
  useAddToCartLineItemFragment,
} from './useAddToCart';

// definition
export const productProductFragment = gql`
  fragment productProductFragment on Product {
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
    ...modalProductFragment
    ...useAddToCartProductFragment
  }

  ${localeFragment}
  ${thumbnailFragment}
  ${modalProductFragment}
  ${useAddToCartProductFragment}
`;

export const productLineItemFragment = gql`
  fragment productLineItemFragment on LineItem {
    ...modalLineItemFragment
    ...useAddToCartLineItemFragment
  }

  ${modalLineItemFragment}
  ${useAddToCartLineItemFragment}
`;
