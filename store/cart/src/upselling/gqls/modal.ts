// import
import { gql } from '@apollo/client';

// graphql import
import { productCarouselProductFragment } from '@meepshop/product-carousel/gqls';
import { productCollectionsProductFragment } from '@meepshop/product-collections/gqls';
import { productDraftTextProductFragment } from '@meepshop/product-draft-text/gqls';
import { productSpecSelectorFragment } from '@meepshop/product-spec-selector/gqls';
import { productVideoProductFragment } from '@meepshop/product-video/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import {
  useAddUpsellingVariantFragment,
  useAddUpsellingLineItemFragment,
} from './useAddUpselling';
import { useVariantFragment } from './useVariant';

// definition
export const modalProductFragment = gql`
  fragment modalProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    description {
      ...localeFragment
    }
    variants {
      id
      sku
      retailPrice
      suggestedPrice
      totalPrice
      ...useAddUpsellingVariantFragment
    }
    ...productCarouselProductFragment
    ...productCollectionsProductFragment
    ...productDraftTextProductFragment
    ...productSpecSelectorFragment
    ...productVideoProductFragment
    ...useVariantFragment
  }

  ${productCarouselProductFragment}
  ${productCollectionsProductFragment}
  ${productDraftTextProductFragment}
  ${productSpecSelectorFragment}
  ${productVideoProductFragment}
  ${localeFragment}
  ${useAddUpsellingVariantFragment}
  ${useVariantFragment}
`;

export const modalLineItemFragment = gql`
  fragment modalLineItemFragment on LineItem {
    ...useAddUpsellingLineItemFragment
  }

  ${useAddUpsellingLineItemFragment}
`;
