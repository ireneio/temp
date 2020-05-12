// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@store/utils/lib/i18n';

import CathayAtm from './CathayAtm';
import GmoAtm from './GmoAtm';
import GmoCvs from './GmoCvs';
import styles from './styles/index.less';

// graphql typescript
import { infoFragment as infoFragmentType } from './__generated__/infoFragment';

// graphql import
import { cathayAtmFragment } from './CathayAtm';
import { gmoAtmFragment } from './GmoAtm';
import { gmoCvsFragment } from './GmoCvs';

// typescript definition
interface PropsType {
  order: infoFragmentType | null | undefined;
}

// definition
export const infoFragment = gql`
  fragment infoFragment on Order {
    id
    paymentInfo {
      id
      list {
        id
        template
      }
    }

    ...cathayAtmFragment
    ...gmoAtmFragment
    ...gmoCvsFragment
  }

  ${cathayAtmFragment}
  ${gmoAtmFragment}
  ${gmoCvsFragment}
`;

export default React.memo(({ order }: PropsType) => {
  const { t } = useTranslation('thank-you-page');

  if (!order)
    return (
      <p className={styles.root}>
        <span>{t('info.error.0')}</span>

        <span>{t('info.error.1')}</span>
      </p>
    );

  switch (order?.paymentInfo?.list?.[0]?.template) {
    case 'cathay_atm':
      return (
        <CathayAtm order={filter(cathayAtmFragment, order)}>
          <p className={styles.root}>{t('info.default')}</p>
        </CathayAtm>
      );
    case 'gmo': {
      const paymentType =
        order?.paymentInfo?.list?.[0]?.accountInfo?.gmo?.paymentType;

      if (paymentType === 'ATM')
        return (
          <GmoAtm order={filter(gmoAtmFragment, order)}>
            <p className={styles.root}>{t('info.default')}</p>
          </GmoAtm>
        );
      if (paymentType === 'KIOSK')
        return (
          <GmoCvs order={filter(gmoCvsFragment, order)}>
            <p className={styles.root}>{t('info.default')}</p>
          </GmoCvs>
        );
      return <p className={styles.root}>{t('info.default')}</p>;
    }
    default:
      return <p className={styles.root}>{t('info.default')}</p>;
  }
});
