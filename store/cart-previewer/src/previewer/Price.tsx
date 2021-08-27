// typescript import
import { languageType } from '@meepshop/locales';

// import
import React, { useContext } from 'react';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

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
  const { t, i18n } = useTranslation('cart');
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
              <div>
                {title?.[i18n.language as languageType] || title?.zh_TW}
              </div>
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
