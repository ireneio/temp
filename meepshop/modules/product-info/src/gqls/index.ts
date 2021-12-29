// import
import { gql } from '@apollo/client';

// graphql import
import { productSpecSelectorFragment } from '@meepshop/product-spec-selector/gqls';

import {
  descriptionProductFragment,
  descriptionVariantFragment,
  descriptionUserFragment,
} from './description';
import {
  quantityVariantFragment,
  quantityProductInfoModuleFragment,
} from './quantity';
import {
  addButtonUserFragment,
  addButtonVariantFragment,
  addButtonStockNotificationFragment,
} from './addButton';
import {
  mobileSpecSelectorProductFragment,
  mobileSpecSelectorVariantFragment,
} from '../mobileSpecSelector/gqls';
import { useVariantProductFragment } from './useVariant';

// definition
export const productInfoFragment = gql`
  fragment productInfoFragment on ProductInfoModule {
    ...quantityProductInfoModuleFragment
    id
    unfoldedVariants
    drawerOnMobile
    unfoldedVariantsOnMobile
    product {
      ...descriptionProductFragment
      ...productSpecSelectorFragment
      ...mobileSpecSelectorProductFragment
      ...useVariantProductFragment
      id
      variants {
        ...descriptionVariantFragment
        ...quantityVariantFragment
        ...addButtonVariantFragment
        ...mobileSpecSelectorVariantFragment
        id
      }
    }
    viewer {
      ...descriptionUserFragment
      ...addButtonUserFragment
      id
    }
    stockNotifications {
      id
      ...addButtonStockNotificationFragment
    }
  }

  ${descriptionProductFragment}
  ${descriptionVariantFragment}
  ${descriptionUserFragment}
  ${quantityVariantFragment}
  ${quantityProductInfoModuleFragment}
  ${addButtonUserFragment}
  ${addButtonVariantFragment}
  ${addButtonStockNotificationFragment}
  ${mobileSpecSelectorProductFragment}
  ${mobileSpecSelectorVariantFragment}
  ${useVariantProductFragment}
  ${productSpecSelectorFragment}
`;
