// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@store/utils/lib/i18n';

import CathayAtm from './CathayAtm';
import styles from './styles/index.less';

// graphql typescript
import { infoFragment as infoFragmentType } from './__generated__/infoFragment';

// graphql import
import { cathayAtmFragment } from './CathayAtm';

// typescript definition
interface PropsType {
  order: infoFragmentType;
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
  }

  ${cathayAtmFragment}
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

    default:
      return <p className={styles.root}>{t('info.default')}</p>;
  }
});
