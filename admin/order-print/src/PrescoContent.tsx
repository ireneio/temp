// import
import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { format, add } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

import { BARCODE_OPTION } from './constants';
import styles from './styles/prescoContent.less';

// graphql typescript
import { prescoContentFragment as prescoContentFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: prescoContentFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('order-print');
  const barcode = useRef(null);
  const order = viewer?.order || null;
  const store = viewer?.store || null;
  const shipmentInfo = order?.shipmentInfo?.list?.[0] || null;
  const presco =
    shipmentInfo?.storeShipmentDetails?.accountInfo?.presco || null;
  const code = `${shipmentInfo?.recipient?.receiverStoreID ||
    ''}${presco?.parentId || ''}${presco?.eshopId || ''}${order?.presco
    ?.shipmentNumber || ''}`;

  useEffect(() => {
    if (code && barcode.current)
      JsBarcode(barcode.current, code, BARCODE_OPTION);
  }, [code]);

  return (
    <div className={styles.root}>
      <p className={styles.orderNo}>
        {t('order-no')}：{order?.orderNo}
      </p>
      <div className={styles.content}>
        <div className={styles.tip}>
          {presco?.isCollection
            ? t('presco.isCollection-true')
            : t('presco.isCollection-false')}
        </div>
        <div className={styles.recipient}>
          {`${t('presco.recipient')} : ${shipmentInfo?.recipient?.name}`}
        </div>
        <div className={styles.shipmentNumber}>
          {`${t('presco.shipmentNumber')} : ${order?.presco?.shipmentNumber}`}
        </div>
        <div className={styles.receiverStoreName}>
          {`${t('presco.receiverStoreName')} : ${
            shipmentInfo?.recipient?.cvsNameForPrescoLabel
          } ${shipmentInfo?.recipient?.receiverStoreID}`}
        </div>
        <img className={styles.barcode} ref={barcode} alt="Barcode" />
        <div className={styles.code}>{code}</div>
        <div className={styles.info}>
          {`${t('presco.purchase-date')} : ${
            !order?.createdAt
              ? null
              : format(
                  add(new Date(order.createdAt), { days: 1 }),
                  'yyyy/MM/dd',
                )
          }`}
        </div>
        <div className={styles.info}>
          {`${t('presco.return-date')} : ${
            !order?.createdAt
              ? null
              : format(
                  add(new Date(order.createdAt), { days: 8 }),
                  'yyyy/MM/dd',
                )
          }`}
        </div>
        <div className={styles.info}>
          {`${t('presco.cname')} : ${store?.description?.name}`}
        </div>
        <div className={styles.info}>
          {`${t('presco.orderNo')} : ${order?.orderNo}`}
        </div>
        <div className={styles.info}>
          {`${t('presco.phoneNumber')} : ${
            store?.setting?.senderInfo?.phoneNumber
          }`}
        </div>
        <div className={styles.info}>
          {`${t('presco.domain')} : ${store?.domain?.[0] ||
            store?.defaultDomain}`}
        </div>
      </div>
    </div>
  );
});
