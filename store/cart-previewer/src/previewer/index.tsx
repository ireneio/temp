// import
import React, { useContext, useRef, useEffect, useState, useMemo } from 'react';
import { filter } from 'graphql-anywhere';
import { LeftOutlined } from '@ant-design/icons';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import Empty from './Empty';
import Products from './Products';
import Price from './Price';
import useComputedCart from './hooks/useComputedCart';
import styles from './styles/index.less';

// graphql typescript
import { previewerUserFragment as previewerUserFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useComputedCartInPreviewerFragment } from './gqls/useComputedCart';
import {
  productsInPreviewerUserFragment,
  productsInPreviewerLineItemFragment,
} from './gqls/products';
import { priceInPreviewerFragment } from './gqls/price';

// typescript definition
export interface PropsType {
  viewer: previewerUserFragmentType | null;
  onClose: () => void;
}

// definition
export default React.memo(({ viewer, onClose }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('cart-previewer');
  const computedCart = useComputedCart(
    filter(useComputedCartInPreviewerFragment, viewer),
  );
  const productsRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const productTotal = useMemo(
    () =>
      (computedCart?.computedLineItems || []).reduce(
        (total, { quantity, unitPrice }) =>
          total + (quantity || 0) * (unitPrice || 0),
        0,
      ),
    [computedCart],
  );
  const discountTotal = useMemo(
    () =>
      (computedCart?.productsDiscount || []).reduce(
        (total, activity) => total + (activity?.discountPrice || 0),
        0,
      ),
    [computedCart],
  );

  useEffect(() => {
    const productsNode = productsRef.current;
    const onScroll = (): void => {
      if ((productsNode?.scrollTop || 0) > 0) setScrolled(true);
      else setScrolled(false);
    };

    if (productsNode) {
      productsNode.addEventListener('scroll', onScroll);
    }

    return () => {
      if (productsNode) productsNode.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <LeftOutlined onClick={onClose} />
          {t('cart')}
        </div>

        {!computedCart?.computedLineItems.length ? (
          <Empty onClose={onClose} />
        ) : (
          <>
            <div className={styles.products} ref={productsRef}>
              <Products
                viewer={filter(productsInPreviewerUserFragment, viewer)}
                products={filter(
                  productsInPreviewerLineItemFragment,
                  computedCart.computedLineItems,
                )}
              />

              <Price
                computedCart={filter(priceInPreviewerFragment, computedCart)}
                productTotal={productTotal}
              />
            </div>

            <div className={styles.footer}>
              <div>
                <span>{t('total')}</span>
                <span>
                  {c(
                    productTotal -
                      discountTotal -
                      computedCart.orderDiscount.totalDiscount,
                  )}
                </span>
              </div>

              <Link href="/cart">
                <div className={styles.button}>{t('go-to-cart')}</div>
              </Link>
            </div>
          </>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              color: ${colors[3]};
              background-color: ${colors[0]};
              box-shadow: 0 2px 15px -3px ${transformColor(colors[3]).alpha(
                0.65,
              )};
            }

            .${styles.footer} {
              border-top-color: ${transformColor(colors[5]).alpha(0.5)};
            }

            .${styles.button} {
              color: ${colors[2]};
              background-color: ${colors[4]};
              box-shadow: 0 1px 5px 0 ${transformColor(colors[2]).alpha(0.2)};
            }

            ${
              !scrolled
                ? ''
                : `
              @media (max-width: ${styles.screenSmMax}) {
                .${styles.footer} {
                  box-shadow: 0 -2px 6px 0 ${transformColor(colors[3]).alpha(
                    0.1,
                  )};
                }
              }
            `
            }
          `,
        }}
      />
    </>
  );
});
