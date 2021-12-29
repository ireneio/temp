// import
import React, { useContext } from 'react';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from './styles/price.less';

// graphql typescript
import {
  priceInPreviewerFragment as priceInPreviewerFragmentType,
  priceInPreviewerFragment_computedLineItems as priceInPreviewerFragmentComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  computedCart: Omit<priceInPreviewerFragmentType, 'computedLineItems'> & {
    computedLineItems: priceInPreviewerFragmentComputedLineItemsType[];
  };
  productTotal: number;
}

// definition
export default React.memo(
  ({
    computedCart: { productsDiscount, orderDiscount },
    productTotal,
  }: PropsType) => {
    const colors = useContext(ColorsContext);
    const { c } = useContext(CurrencyContext);
    const { t } = useTranslation('cart-previewer');
    const getLanguage = useGetLanguage();

    return (
      <>
        <div className={styles.root}>
          <div>
            <div>{t('product-total')}</div>
            <div>{c(productTotal)}</div>
          </div>

          {[...productsDiscount, ...orderDiscount.discountAllocations].map(
            activity => {
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
            },
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.root} {
              color: ${colors[3]};
              border-top-color: ${transformColor(colors[5]).alpha(0.5)}
            }
          `,
          }}
        />
      </>
    );
  },
);
