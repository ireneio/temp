// import
import React from 'react';
import { Modal, Radio } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useSetPaymentSetting from './hooks/useSetPaymentSetting';
import styles from './styles/atmCheck.less';

// graphql typescript
import { StoreBillingPaymentMethodEnum } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  setPaymentType: (value?: 'ATM') => void;
}

// definition
const { Group } = Radio;

export default React.memo(({ setPaymentType }: PropsType) => {
  const { t } = useTranslation('bill');
  const setPaymentSetting = useSetPaymentSetting();

  return (
    <Modal
      wrapClassName={styles.modal}
      width={496}
      visible
      closable={false}
      okText={t('payment.save')}
      cancelText={t('payment.cancel')}
      onOk={() => {
        setPaymentSetting({
          method: 'ATM' as StoreBillingPaymentMethodEnum,
          isRecurring: false,
        });
        setPaymentType('ATM');
      }}
      onCancel={() => setPaymentType()}
    >
      <h1>{t('payment.choose-payment-method')}</h1>
      <div>{t('payment.default-atm-description')}</div>

      <Group defaultValue="atm">
        <Radio key="atm" value="atm">
          <h1>{t('payment.atm')}</h1>
          <div>{t('payment.atm-description')}</div>
        </Radio>
      </Group>
    </Modal>
  );
});
