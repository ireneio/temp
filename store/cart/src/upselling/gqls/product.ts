// import
import { gql } from '@apollo/client';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import {
  modalUserFragment,
  modalProductFragment,
  modalLineItemFragment,
} from './modal';
import {
  useAddToCartUserFragment,
  useAddToCartProductFragment,
  useAddToCartLineItemFragment,
} from './useAddToCart';

// definition
export const productUserFragment = gql`
  fragment productUserFragment on User {
    id
    ...modalUserFragment
    ...useAddToCartUserFragment
  }

  ${modalUserFragment}
  ${useAddToCartUserFragment}
`;

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
