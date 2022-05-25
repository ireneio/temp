// import
import React, { useState, useCallback } from 'react';
import { Modal, Radio } from 'antd';

import TapPay from '@admin/tap-pay';
import { useTranslation } from '@meepshop/locales';

import useCreditCard from './hooks/useCreditCard';
import styles from './styles/creditCardAndAtm.less';

// graphql typescript
import {
  StoreBillPayeeEnum,
  paymentStoreBillingSettingFragment_payment_creditCard as paymentStoreBillingSettingFragmentPaymentCreditCard,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  billId: string;
  payee: StoreBillPayeeEnum | null;
  creditCard: paymentStoreBillingSettingFragmentPaymentCreditCard | null;
  setPaymentType: (value?: 'ATM') => void;
}

// definition
const { Group } = Radio;

export default React.memo(
  ({ billId, payee, creditCard, setPaymentType }: PropsType) => {
    const { t } = useTranslation('bill');
    const [paymentMethod, setPaymentMethod] = useState('prime');
    const { hasErrors, setPrime, loading, payByPrime, success } = useCreditCard(
      billId,
      creditCard,
    );

    const onOk = useCallback(() => {
      if (paymentMethod === 'prime') payByPrime();
      else if (paymentMethod === 'atm') setPaymentType('ATM');
    }, [paymentMethod, payByPrime, setPaymentType]);

    return (
      <Modal
        wrapClassName={styles.modal}
        width={496}
        visible
        closable={false}
        confirmLoading={loading}
        okText={t('payment.save')}
        cancelText={t('payment.cancel')}
        onOk={() => onOk()}
        onCancel={() => setPaymentType()}
      >
        <h1>{t('payment.choose-payment-method')}</h1>
        <div>{t('payment.save-default-payment-method')}</div>

        <Group
          defaultValue={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <Radio key="prime" value="prime">
            <h1>{t('payment.credit-card')}</h1>
            <div>{t('payment.add-credit-card-description')}</div>

            {paymentMethod !== 'prime' ? null : (
              <TapPay
                setPrime={value => setPrime(value)}
                payee={payee}
                hasErrors={hasErrors}
                loading={loading}
                success={success}
              />
            )}
          </Radio>

          <Radio key="atm" value="atm">
            <h1>{t('payment.atm')}</h1>
            <div>{t('payment.atm-description')}</div>
          </Radio>
        </Group>
      </Modal>
    );
  },
);
