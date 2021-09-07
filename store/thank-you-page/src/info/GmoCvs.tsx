// import
import React, { useContext } from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import { gmoCsvLogos } from '@meepshop/images';

import styles from './styles/gmoCvs.less';

// graphql typescript
import { gmoCvsFragment as gmoCvsFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: gmoCvsFragmentType;
  children: React.ReactElement;
}

// definition
export default React.memo(({ order, children }: PropsType) => {
  const { t } = useTranslation('thank-you-page');
  const { c } = useContext(CurrencyContext);
  const cvsPayCode = order?.paymentInfo?.list?.[0]?.cvsPayCode;

  if (!cvsPayCode) return children;

  return (
    <div className={styles.root}>
      <p>{t('info.cvs')}</p>

      <div className={styles.block}>
        <div>
          {[
            {
              key: 'pay-code',
              value: cvsPayCode.payCode,
            },
            {
              key: 'price',
              value: c(order?.priceInfo?.total || 0),
            },
            {
              key: 'expire-date',
              value: format(
                new Date(cvsPayCode.expireDate || new Date()),
                'yyyy/MM/dd HH:mm:ss',
              ),
            },
          ].map(({ key, value }) => (
            <div key={key} className={styles.row}>
              <div>{t(`cvs.${key}`)}</div>

              <div>{value}</div>
            </div>
          ))}
        </div>

        <img src={gmoCsvLogos} alt="gmo-csv-logos" />

        <div>{t('cvs.description')}</div>
      </div>
    </div>
  );
});
