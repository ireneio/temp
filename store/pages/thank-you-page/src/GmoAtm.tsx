// import
import React, { useContext } from 'react';
import { format } from 'date-fns';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/gmoAtm.less';

// graphql typescript
import { gmoAtmFragment as gmoAtmFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: gmoAtmFragmentType;
}

// definition
export default React.memo(({ order }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('thank-you-page');
  const atm = order?.paymentInfo?.list?.[0]?.atm;

  if (!atm) return null;

  return (
    <>
      <div className={styles.root}>
        <p>{t('info.atm')}</p>

        <div className={styles.block}>
          {[
            {
              key: 'back-code',
              value: atm.bankCode,
            },
            {
              key: 'account',
              value: atm.account,
            },
            {
              key: 'price',
              value: c(order?.priceInfo?.total || 0),
            },
            {
              key: 'expire-date',
              value: format(
                new Date(atm.expireDate || new Date()),
                'yyyy/MM/dd HH:mm:ss',
              ),
            },
          ].map(({ key, value }) => (
            <div key={key} className={styles.row}>
              <div>{t(`atm.${key}`)}</div>

              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} > p {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.block} {
              background-color: ${colors[1]};
              box-shadow: 0 2px 15px 0 ${transformColor(colors[3]).alpha(0.15)};
            }

            .${styles.row} > div:first-child {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }
          `,
        }}
      />
    </>
  );
});
