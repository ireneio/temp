// import
import React, { useContext, useMemo } from 'react';
import { Skeleton } from 'antd';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from './styles/price.less';

// graphql typescript
import {
  priceComputedCartFragment as priceComputedCartFragmentType,
  priceComputedCartFragment_computedLineItems as priceComputedCartFragmentComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  computedCart:
    | (Omit<priceComputedCartFragmentType, 'computedLineItems'> & {
        computedLineItems: priceComputedCartFragmentComputedLineItemsType[];
      })
    | null;
}

// definition
export default React.memo(({ computedCart }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('cart');
  const getLanguage = useGetLanguage();
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

  return (
    <>
      <div className={styles.root}>
        {!computedCart ? (
          <Skeleton
            title={false}
            paragraph={{ rows: 4, width: '100%' }}
            active
          />
        ) : (
          <>
            <h1>{t('cart-total')}</h1>

            <div>
              <div>{t('product-total')}</div>
              <div>{c(productTotal)}</div>
            </div>

            {[
              ...computedCart.productsDiscount,
              ...computedCart.orderDiscount.discountAllocations,
            ].map(activity => {
              if (!activity) return null;

              const { title } = activity;
              const id = 'id' in activity ? activity.id : activity.activityId;
              const discountPrice = activity.discountPrice || 0;

              if (discountPrice <= 0) return null;

              return (
                <div key={id}>
                  <div>{getLanguage(title)}</div>
                  <div>- {c(discountPrice)}</div>
                </div>
              );
            })}

            <div className={styles.subtotal}>
              <div>{t('subtotal')}</div>
              <div>
                {c(
                  productTotal -
                    discountTotal -
                    computedCart.orderDiscount.totalDiscount,
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              color: ${colors[3]};
              background-color: ${transformColor(colors[3]).alpha(0.03)};
            }

            .${styles.subtotal} {
              border-color: ${transformColor(colors[3]).alpha(0.1)};
            }

            @media (max-width: ${styles.screenSmMax}) {
              .${styles.root} h1 {
                border-color: ${colors[3]};
              }

              .${styles.subtotal} {
                border-color: ${transformColor(colors[3]).alpha(0.3)};
              }
            }
          `,
        }}
      />
    </>
  );
});
