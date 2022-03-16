// typescript import
import { FormItemProps } from 'antd/lib/form';

// import
import React, { useCallback } from 'react';
import { Form } from 'antd';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import { useCart } from '@meepshop/hooks';
import ProductAmountSelector from '@meepshop/product-amount-selector';

import styles from './styles/productAmountSelector.less';

// graphql typescript
import {
  productAmountSelectorLineItemFragment as productAmountSelectorLineItemFragmentType,
  productAmountSelectorUserFragment as productAmountSelectorUserFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface PropsType extends FormItemProps {
  viewer: productAmountSelectorUserFragmentType | null;
  lineItem: productAmountSelectorLineItemFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    viewer,
    lineItem: { productId, variantId, status, quantity, variant },
    name,
    ...formItemProps
  }: PropsType) => {
    const { t } = useTranslation('cart');
    const { upsertCart } = useCart(filter(useCartFragment, viewer));
    const validator = useCallback(async () => {
      if (!['PURCHASABLE'].includes(status)) {
        throw new Error(status);
      }
    }, [status]);

    return (
      <>
        <FormItem
          {...formItemProps}
          name={name}
          rules={[{ validator }]}
          noStyle
        >
          <ProductAmountSelector
            size="large"
            className={`${styles.root} ${
              status !== 'PURCHASABLE' ? styles.error : ''
            }`}
            variant={variant}
            onChange={newQuantity => {
              upsertCart({
                __typename: 'CartItem' as const,
                productId,
                quantity: newQuantity - (quantity || 0),
                variantId,
              });
            }}
          />
        </FormItem>

        {!['LIMIT_EXCEEDED', 'MINIMUM_NOT_REACHED'].includes(status) ? null : (
          <div className={styles.amountError}>{t(status)}</div>
        )}
      </>
    );
  },
);
