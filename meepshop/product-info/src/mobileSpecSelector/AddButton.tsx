// import
import React, { useContext } from 'react';
import { Icon } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/addButton.less';

// typescript definition
export interface PropsType {
  addProductToCart: () => void;
  min: number;
  max: number;
  quantity: number;
  onChangeQuantity: (value: number) => void;
  onClose: () => void;
}

// definition
export default React.memo(
  ({
    addProductToCart,
    min,
    max,
    quantity,
    onChangeQuantity,
    onClose,
  }: PropsType) => {
    const { t } = useTranslation('product-spec-selector');
    const colors = useContext(ColorsContext);

    return (
      <>
        <div className={styles.root}>
          <div>
            <span
              onClick={() => {
                if (quantity > min) onChangeQuantity(quantity - 1);
              }}
            >
              <Icon type="minus" />
            </span>

            <span>{quantity}</span>

            <span
              onClick={() => {
                if (quantity < max) onChangeQuantity(quantity + 1);
              }}
            >
              <Icon type="plus" />
            </span>
          </div>

          <div
            className={styles.addToCart}
            onClick={() => {
              if (min <= quantity && quantity <= max) {
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
