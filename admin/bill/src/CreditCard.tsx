// import
import React, { useState, useCallback } from 'react';
import { Modal, Radio } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';

import TapPay from '@admin/tap-pay';
import { useTranslation } from '@meepshop/locales';

import useCreditCard from './hooks/useCreditCard';
import styles from './styles/creditCard.less';

// graphql typescript
import { paymentStoreBillingSettingFragment_payment_creditCard as paymentStoreBillingSettingFragmentPaymentCreditCard } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  billId: string;
  creditCard: paymentStoreBillingSettingFragmentPaymentCreditCard | null;
  setPaymentType: (value?: 'ATM') => void;
}

// definition
const { Group } = Radio;

export default React.memo(
  ({ billId, creditCard, setPaymentType }: PropsType) => {
    const { t } = useTranslation('bill');
    const [paymentMethod, setPaymentMethod] = useState(
      !creditCard ? 'prime' : 'cardId',
    );
    const {
      hasErrors,
      setPrime,
      loading,
      payByPrime,
      success,
      payByCardId,
    } = useCreditCard(billId, creditCard);

    const onOk = useCallback(() => {
      if (paymentMethod === 'prime') payByPrime();
      else if (paymentMethod === 'cardId') payByCardId();
    }, [paymentMethod, payByPrime, payByCardId]);

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
        <div>{t('payment.credit-card-description')}</div>

        <Group
          defaultValue={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          {!creditCard ? null : (
            <Radio key="cardId" value="cardId">
              <h1>{t('payment.default-credit-card')}</h1>
              <div>{t('payment.default-credit-card-description')}</div>

              <div className={styles.creditCard}>
                <CreditCardOutlined />
                <div>{`**** **** **** ${creditCard.lastFourDigit}`}</div>
              </div>
            </Radio>
          )}

          <Radio key="prime" value="prime">
            <h1>{t('payment.add-credit-card')}</h1>
            <div>{t('payment.add-credit-card-description')}</div>

            {paymentMethod !== 'prime' ? null : (
              <TapPay
                setPrime={value => setPrime(value)}
                hasErrors={hasErrors}
                loading={loading}
                success={success}
              />
            )}
          </Radio>
        </Group>
      </Modal>
    );
  },
);
