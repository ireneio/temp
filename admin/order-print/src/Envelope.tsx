// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/envelope.less';

// graphql typescript
import { envelopeFragment as envelopeFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default React.memo(
  ({
    viewer,
    printType,
  }: {
    viewer: envelopeFragmentType | null;
    printType: '1x1' | '1x2' | '2x2' | '2x5';
  }) => {
    const { t } = useTranslation('order-print');
    const store = viewer?.store || null;
    const order = viewer?.order || null;
    const template = order?.shipmentInfo?.list?.[0]?.template || '';

    return (
      <div className={styles.root}>
        <div className={styles.sheet}>
          <div className={styles[`envelopeType${printType}`]}>
            <div>
              <div className={styles.envelope}>
                <div>
                  <p>{store?.description?.name}</p>
                  <div className={styles.sender}>
                    <p>{store?.setting?.senderInfo?.streetAddress}</p>
                    <p>{store?.setting?.senderInfo?.name}</p>
                    <p>{store?.setting?.senderInfo?.phoneNumber}</p>
                  </div>
                </div>
                <div className={styles.recipientWrapper}>
                  <div className={styles.recipient}>
                    {['allpay', 'gmo', 'ezship'].includes(template || '') && (
                      <p>{order?.address?.fullAddress}</p>
                    )}
                    <p>
                      {order?.shipmentInfo?.list?.[0]?.recipient?.name}{' '}
                      {t('receive')}
                    </p>
                    <p className={styles.tel}>
                      {order?.shipmentInfo?.list?.[0]?.recipient?.mobile}
                    </p>
                  </div>
                </div>
                <div className={styles.orderNo}>
                  {t('order-no')}：{order?.orderNo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
