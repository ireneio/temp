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
import { priceInPreviewerFragment as priceInPreviewerFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: priceInPreviewerFragmentType;
}

// definition
export default React.memo(({ order }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('cart-previewer');
  const getLanguage = useGetLanguage();
  const { activityInfo, priceInfo } = order;

  return (
    <>
      <div className={styles.root}>
        <div>
          <div>{t('product-total')}</div>
          <div>{c(priceInfo?.productPrice || 0)}</div>
        </div>

        {activityInfo?.map(activity => {
          if (!activity) return null;

          const discountPrice = activity.discountPrice || 0;
          const { activityId, title } = activity;

          if (discountPrice <= 0) return null;

          return (
            <div key={activityId}>
              <div>{getLanguage(title)}</div>
              <div>- {c(discountPrice)}</div>
            </div>
          );
        })}
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
});
