// import
import React, { useContext, useMemo } from 'react';
import { Skeleton, Form } from 'antd';
import transformColor from 'color';
import VisibilitySensor from 'react-visibility-sensor';

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
  showFooter: boolean;
  setShowFooter: (value: boolean) => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ computedCart, showFooter, setShowFooter }: PropsType) => {
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
    const shipmentFee = useMemo(
      () =>
        computedCart?.orderDiscount.discountAllocations?.find(
          activity => activity?.plugin === 'freeShipping',
        )
          ? 0
          : computedCart?.shippingFee || 0,
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

                if (discountPrice <= 0 || activity?.plugin === 'freeShipping')
                  return null;

                return (
                  <div key={id}>
                    <div>{getLanguage(title)}</div>
                    <div>- {c(discountPrice)}</div>
                  </div>
                );
              })}

              <FormItem dependencies={['shipmentId']} noStyle>
                {({ getFieldValue }) => (
                  <div className={styles.shipment}>
                    <div>{t('shipment-fee')}</div>
                    <div>
                      {(() => {
                        if (
                          computedCart.orderDiscount.discountAllocations?.find(
                            activity => activity?.plugin === 'freeShipping',
                          )
                        )
                          return t('free-shipment');

                        if (getFieldValue(['shipmentId']))
                          return c(computedCart.shippingFee);

                        return t('not-selected');
                      })()}
                    </div>
                  </div>
                )}
              </FormItem>

              <VisibilitySensor
                active={!showFooter}
                onChange={isVisible => {
                  if (isVisible) setShowFooter(true);
                }}
                partialVisibility
              >
                <div className={styles.subtotal}>
                  <div>{t('subtotal')}</div>
                  <div>
                    {c(
                      productTotal -
                        discountTotal -
                        computedCart.orderDiscount.totalDiscount +
                        shipmentFee,
                    )}
                  </div>
                </div>
              </VisibilitySensor>
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

              .${styles.shipment} {
                border-top: 1px solid ${transformColor(colors[3]).alpha(0.1)};
                border-bottom: 1px solid ${transformColor(colors[3]).alpha(
                  0.1,
                )};
              }

              @media (max-width: ${styles.screenSmMax}) {
                .${styles.root} h1 {
                  border-color: ${colors[3]};
                }

                .${styles.shipment} {
                  border-color: ${transformColor(colors[3]).alpha(0.3)};
                }
              }
            `,
          }}
        />
      </>
    );
  },
);
