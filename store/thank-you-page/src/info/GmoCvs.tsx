// import
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { currency as currencyContext } from '@meepshop/context';
import { gmoCsvLogos } from '@meepshop/images';

import styles from './styles/gmoCvs.less';

// graphql typescript
import { gmoCvsFragment as gmoCvsFragmentType } from './__generated__/gmoCvsFragment';

// typescript definition
interface PropsType {
  order: gmoCvsFragmentType;
  children: React.ReactElement;
}

// definition
export const gmoCvsFragment = gql`
  fragment gmoCvsFragment on Order {
    id
    paymentInfo {
      id
      list {
        id
        cvsPayCode {
          payCode
          expireDate
        }
        accountInfo {
          gmo {
            paymentType
          }
        }
      }
    }

    priceInfo {
      total
    }
  }
`;

export default React.memo(({ order, children }: PropsType) => {
  const { t } = useTranslation('thank-you-page');
  const { c } = useContext(currencyContext);
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
              value: moment(cvsPayCode.expireDate).format(
                'YYYY/MM/DD HH:mm:ss',
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
