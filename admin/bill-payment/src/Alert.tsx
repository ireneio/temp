// import
import React, { useMemo } from 'react';
import { Alert } from 'antd';
import { WarningOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

import styles from './styles/alert.less';

// graphql typescript
import { alertFragment as alertFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default React.memo(({ store }: { store: alertFragmentType | null }) => {
  const { t } = useTranslation('bill-payment');

  const adminStatus = store?.adminStatus;
  const unpaidBillsTotalCount = store?.unpaidBills?.totalCount;
  const paymentStatus = store?.firstBill?.edges?.[0]?.node?.payment?.status;
  const invoice = store?.setting?.billing?.invoice;

  const alertType = useMemo(() => {
    if (unpaidBillsTotalCount)
      return paymentStatus === 'FAIL' ? 'fail' : 'unpaid';
    if (adminStatus !== 'OPEN') return 'closed';

    return null;
  }, [unpaidBillsTotalCount, paymentStatus, adminStatus]);

  return (
    <div className={styles.root}>
      {!alertType ? null : (
        <Alert
          message={t(`alert.${alertType}.0`)}
          description={
            <>
              {t(`alert.${alertType}.1`)}

              {/* TODO: ues it when complete migration
              <Link href={`/bill-payment/${id}`}>
                <span>{t('alert.go-to-pay')}</span>
              </Link> */}
            </>
          }
          type={alertType === 'unpaid' ? 'warning' : 'error'}
          icon={
            alertType === 'unpaid' ? (
              <ExclamationCircleOutlined />
            ) : (
              <WarningOutlined />
            )
          }
          showIcon
        />
      )}

      {invoice?.accountType &&
      invoice?.name &&
      invoice?.addressV2?.country?.id &&
      invoice?.addressV2?.city?.id &&
      invoice?.addressV2?.area?.id &&
      invoice?.addressV2?.street ? null : (
        <Alert
          message={
            <>
              {t('alert.invoice.0')}
              <Link href="/bill-payment/setting">
                <span>{t('alert.invoice.1')}</span>
              </Link>
            </>
          }
          type="info"
          icon={<ExclamationCircleOutlined />}
          showIcon
          closable
        />
      )}
    </div>
  );
});
