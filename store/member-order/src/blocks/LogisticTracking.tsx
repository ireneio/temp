// import
import React from 'react';
import moment from 'moment';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/index.less';

// graphql typescript
import { logisticTrackingFragment as logisticTrackingFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  latestLogisticTracking: logisticTrackingFragmentType;
}

// definition
export default React.memo(
  ({ latestLogisticTracking: { status, updatedAt } }: PropsType) => {
    const { t } = useTranslation('member-order');
    return (
      <div>
        <div>
          {t('blocks.shipment.logistic.status.title')}

          {t(`blocks.shipment.logistic.status.${status}`)}
        </div>

        <div>
          {t('blocks.shipment.logistic.updated-at')}

          {moment(updatedAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>

        <div className={styles.tip}>{t('blocks.shipment.logistic.tip')}</div>
      </div>
    );
  },
);
