// typescript import
import { PropsType as ProductAmountSelectorPropsType } from '@meepshop/product-amount-selector';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import ProductAmountSelector from '@meepshop/product-amount-selector';

// graphql typescript
import {
  quantityVariantFragment,
  quantityProductInfoModuleFragment,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';

// typescript definition
export interface PropsType
  extends quantityProductInfoModuleFragment,
    Pick<ProductAmountSelectorPropsType, 'value' | 'onChange'> {
  variant: quantityVariantFragment | null;
  max: number;
  quantityInCart: number;
}

// definition
export default React.memo(
  ({ unfoldedVariants, variant, max, quantityInCart, ...props }: PropsType) => {
    const { t } = useTranslation('product-info');

    if (max === 0) return <div>{t('out-of-stock')}</div>;

    if (quantityInCart >= max) return <div>{t('over-stock')}</div>;

    return (
      <ProductAmountSelector
        {...props}
        variant={filter(productAmountSelectorFragment, variant)}
        size={unfoldedVariants ? 'default' : 'large'}
      />
    );
  },
);
