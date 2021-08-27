// typescript import
import { languageType } from '@meepshop/locales';

// import
import React, { useContext } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/price.less';

// graphql typescript
import { priceFragment as priceFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: priceFragmentType;
  checkErrors: () => void;
}

// definition
export default React.memo(({ order, checkErrors }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t, i18n } = useTranslation('cart');
  const { activityInfo, priceInfo } = order;

  return (
    <>
      <div className={styles.root}>
        <Link href={window.storePreviousPageUrl || '/'}>
          <div>
            <LeftOutlined />
            {t('go-back-to-store')}
          </div>
        </Link>

        <div>
          <div className={styles.total}>
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

            <div>
              <div>{t('total')}</div>
              <div>{c(priceInfo?.total || 0)}</div>
            </div>
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
