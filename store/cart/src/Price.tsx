// import
import React, { useContext, useMemo } from 'react';
import { Skeleton } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useRouter } from '@meepshop/link';
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
  checkErrors: () => void;
}

// definition
export default React.memo(({ computedCart, checkErrors }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { push } = useRouter();
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
        <div
          onClick={() => {
            const url = window.storePreviousPageUrl || '/';
            push(!url.startsWith('/checkout') ? url : '/');
          }}
        >
          <LeftOutlined />
          {t('go-back-to-store')}
        </div>

        <div>
          <div className={styles.total}>
            {!computedCart ? (
              <Skeleton
                title={false}
                paragraph={{
                  rows: 4,
                  width: '100%',
                }}
                active
              />
            ) : (
              <>
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
                  const id =
                    'id' in activity ? activity.id : activity.activityId;
                  const discountPrice = activity.discountPrice || 0;

                  if (discountPrice <= 0) return null;

                  return (
                    <div key={id}>
                      <div>{getLanguage(title)}</div>
                      <div>- {c(discountPrice)}</div>
                    </div>
                  );
                })}

                <div className={styles.priceTotal}>
                  <div>{t('total')}</div>
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

          <div className={styles.button} onClick={checkErrors}>
            {t('go-to-checkout')}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              color: ${colors[3]};
            }

            .${styles.button} {
              color: ${colors[2]};
              background-color: ${colors[4]};
              box-shadow: 0 1px 5px 0 ${transformColor(colors[2]).alpha(0.2)};
            }
          `,
        }}
      />
    </>
  );
});
