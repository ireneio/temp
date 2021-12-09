// import
import React from 'react';
import { Modal, Spin } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useAtm from './hooks/useAtm';
import styles from './styles/atm.less';

// typescript definition
interface PropsType {
  billId: string;
  onCancel: () => void;
}

// definition
export default React.memo(({ billId, onCancel }: PropsType) => {
  const { t } = useTranslation('bill');
  const { ecpayLoading, loading, ecpayScript, createECPayATMPayment } = useAtm(
    billId,
    onCancel,
  );

  return (
    <Modal
      width={648}
      visible
      title={t('payment.get-bank-account')}
      confirmLoading={loading}
      okText={t('payment.ok')}
      cancelText={t('payment.cancel')}
      onOk={() => createECPayATMPayment()}
      onCancel={() => onCancel()}
    >
      {!ecpayLoading ? null : <Spin className={styles.spin} />}

      <div id="ECPayPayment" />

      {ecpayScript}
    </Modal>
  );
});
