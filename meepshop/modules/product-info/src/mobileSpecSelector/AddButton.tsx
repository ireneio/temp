// import
import React, { useContext } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/addButton.less';

// graphql typescript
import { addButtonFragment } from '@meepshop/types/gqls/meepshop';

// typescript definition
export interface PropsType {
  variant: addButtonFragment | null;
  addProductToCart: () => void;
  quantity: number;
  quantityInCart: number;
  onChangeQuantity: (value: number) => void;
  onClose: () => void;
}

// definition
export default React.memo(
  ({
    variant,
    addProductToCart,
    quantity,
    quantityInCart,
    onChangeQuantity,
    onClose,
  }: PropsType) => {
    const { t } = useTranslation('product-spec-selector');
    const colors = useContext(ColorsContext);
    const currentMinPurchasableQty =
      (variant?.currentMinPurchasableQty || 0) - quantityInCart;
    const currentMaxPurchasableQty =
      (variant?.currentMaxPurchasableQty || 0) - quantityInCart;

    return (
      <>
        <div className={styles.root}>
          <div>
            <span
              onClick={() => {
                if (quantity > currentMinPurchasableQty)
                  onChangeQuantity(quantity - 1);
              }}
            >
              <MinusOutlined />
            </span>

            <span>{quantity}</span>

            <span
              onClick={() => {
                if (quantity < currentMaxPurchasableQty)
                  onChangeQuantity(quantity + 1);
              }}
            >
              <PlusOutlined />
            </span>
          </div>

          <div
            className={styles.addToCart}
            onClick={() => {
              if (
                currentMinPurchasableQty <= quantity &&
                quantity <= currentMaxPurchasableQty
              ) {
                addProductToCart();
                onClose();
              }
            }}
          >
            {t('add-to-cart')}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.addToCart} {
              background-color: ${colors[4]};
              color: ${colors[2]};
            }
          `,
          }}
        />
      </>
    );
  },
);
