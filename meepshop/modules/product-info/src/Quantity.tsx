// typescript import
import { PropsType as ProductAmountSelectorPropsType } from '@meepshop/product-amount-selector';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import ProductAmountSelector from '@meepshop/product-amount-selector';

// graphql typescript
import {
  quantityVariantFragment as quantityVariantFragmentType,
  quantityProductInfoModuleFragment as quantityProductInfoModuleFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';

// typescript definition
export interface PropsType
  extends quantityProductInfoModuleFragmentType,
    Pick<ProductAmountSelectorPropsType, 'value' | 'onChange'> {
  variant: quantityVariantFragmentType | null;
  quantityInCart: number;
}

// definition
export default React.memo(
  ({ unfoldedVariants, variant, quantityInCart, ...props }: PropsType) => {
    const { t } = useTranslation('product-info');
    const currentMaxPurchasableQty = variant?.currentMaxPurchasableQty || 0;
    const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;

    if (currentMinPurchasableQty === 0) return <div>{t('out-of-stock')}</div>;

    if (quantityInCart >= currentMaxPurchasableQty)
      return <div>{t('over-stock')}</div>;

    return (
      <ProductAmountSelector
        {...props}
        variant={filter(productAmountSelectorFragment, variant)}
        size={unfoldedVariants ? 'middle' : 'large'}
      />
    );
  },
);
