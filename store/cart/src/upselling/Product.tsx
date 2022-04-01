// import
import React, { useContext, useState } from 'react';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Thumbnail from '@meepshop/thumbnail';
import filter from '@meepshop/utils/lib/filter';

import Modal from './Modal';
import useAddToCart from './hooks/useAddToCart';
import styles from './styles/product.less';

// graphql typescript
import {
  productUserFragment as productUserFragmentType,
  productProductFragment as productProductFragmentType,
  productLineItemFragment as productLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  modalUserFragment,
  modalProductFragment,
  modalLineItemFragment,
} from './gqls/modal';
import {
  useAddToCartUserFragment,
  useAddToCartProductFragment,
  useAddToCartLineItemFragment,
} from './gqls/useAddToCart';

// typescript definition
interface PropsType {
  viewer: productUserFragmentType;
  product: productProductFragmentType;
  cartItems: (productLineItemFragmentType | null)[];
  isOverLimit: boolean;
  isWithProducts: boolean;
}

// definition
export default React.memo(
  ({ viewer, product, cartItems, isOverLimit, isWithProducts }: PropsType) => {
    const { t } = useTranslation('cart');
    const getLanguage = useGetLanguage();
    const colors = useContext(ColorsContext);
    const { c } = useContext(CurrencyContext);
    const [visible, setVisible] = useState(false);
    const { status, addToCart } = useAddToCart({
      viewer: filter(useAddToCartUserFragment, viewer),
      product: filter(useAddToCartProductFragment, product),
      cartItems: filter(useAddToCartLineItemFragment, cartItems),
      setVisible,
      isOverLimit,
    });
    const variant = product.variants?.[0];
    const title = getLanguage(product.title);

    return (
      <>
        <div className={styles.root}>
          <div>
            <Thumbnail
              image={product.coverImage}
              className={styles.image}
              size={168}
              mobileSize={136}
              disableRound
              disableShadow
              source="w240"
              onClick={() => setVisible(true)}
            />

            {!title ? null : (
              <div className={styles.title} onClick={() => setVisible(true)}>
                {title}
              </div>
            )}
          </div>

          <div>
            {!variant?.listPrice ? null : (
              <div className={styles.price}>{c(variant.listPrice)}</div>
            )}

            {!variant?.suggestedPrice ? null : (
              <div className={styles.price}>{c(variant.suggestedPrice)}</div>
            )}

            {!variant?.totalPrice ? null : (
              <div className={styles.totalPrice}>{c(variant.totalPrice)}</div>
            )}

            {!isWithProducts ? null : (
              <div
                className={`${styles.button} ${
                  status !== 'AVAILABLE' ? styles.disabled : ''
                }`}
                onClick={addToCart}
              >
                {t(`upselling.${status}`)}
              </div>
            )}
          </div>
        </div>

        {!visible ? null : (
          <Modal
            viewer={filter(modalUserFragment, viewer)}
            product={filter(modalProductFragment, product)}
            cartItems={filter(modalLineItemFragment, cartItems)}
            onCancel={() => setVisible(false)}
            isOverLimit={isOverLimit}
            isWithProducts={isWithProducts}
          />
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} {
                background-color: ${colors[0]};
              }

              .${styles.image} {
                border-color: ${transformColor(colors[3]).alpha(0.1)};
              }

              .${styles.title},
              .${styles.totalPrice} {
                color: ${colors[3]};
              }

              .${styles.price} {
                color: ${transformColor(colors[3]).alpha(0.65)};
              }

              .${styles.button} {
                color: ${colors[0]};
                background-color: ${colors[3]};
              }
            `,
          }}
        />
      </>
    );
  },
);
