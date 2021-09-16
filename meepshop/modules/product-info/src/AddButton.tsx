// import
import React, { useContext } from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Apps as AppsContext } from '@meepshop/context';
import Link from '@meepshop/link';

// graphql typescript
import {
  addButtonUserFragment,
  addButtonVariantFragment,
  addButtonStockNotificationFragment,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  viewer: addButtonUserFragment | null;
  variant: addButtonVariantFragment | null;
  // SHOULD_NOT_BE_NULL
  stockNotifications: (addButtonStockNotificationFragment | null)[] | null;
  quantityInCart: number;
}

// definition
export default React.memo(
  ({ viewer, variant, stockNotifications, quantityInCart }: PropsType) => {
    const { t } = useTranslation('product-info');
    const apps = useContext(AppsContext);

    if (apps.memberSeePrice && viewer?.role === 'SHOPPER')
      return (
        <Link href="/login">
          <Button>{t('login-first')}</Button>
        </Link>
      );

    const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;
    const currentMaxPurchasableQty = variant?.currentMaxPurchasableQty || 0;

    if (
      currentMinPurchasableQty < quantityInCart &&
      quantityInCart < currentMaxPurchasableQty
    )
      return <Button>{t('add-to-cart')}</Button>;

    if (apps.productNotice) {
      const productNotice = stockNotifications?.some(
        item => variant && item?.variantId === variant?.id,
      );

      return (
        <Button>{productNotice ? t('notice-done') : t('notice-me')}</Button>
      );
    }

    return <Button>{t('sold-out')}</Button>;
  },
);
