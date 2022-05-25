// import
import React, { useMemo } from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import usePayment from './hooks/usePayment';
import { formatMonth, formatMoney } from './utils/format';
import styles from './styles/info.less';

// graphql typescript
import {
  infoFragment,
  paymentStoreBillingSettingFragment,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  bill: infoFragment;
  billing: paymentStoreBillingSettingFragment | null;
}

// definition
export default React.memo(({ bill, billing }: PropsType) => {
  const { t } = useTranslation('bill');
  const { modal, setPaymentType } = usePayment({
    billId: bill?.id || null,
    payee: bill.payment?.payee || null,
    creditCard: billing?.payment?.creditCard || null,
  });

  const actualPaymentMethod = useMemo(() => bill.payment?.method, [bill]);
  const settingPaymentMethod = useMemo(
    () =>
      billing?.payment?.method === 'ATM' ||
      billing?.payment?.method === 'CREDIT_CARD'
        ? billing?.payment?.method
        : undefined,
    [billing],
  );

  const paymentStatue = useMemo(() => {
    if (actualPaymentMethod === 'NO_NEED_TO_PAY') return 'noNeedToPay';
    if (bill.payment?.status === 'PAID') return 'paid';
    return 'unpaid';
  }, [bill, actualPaymentMethod]);

  const hasGotBankAccount = useMemo(
    () =>
      settingPaymentMethod === 'ATM' &&
      bill.payment?.atmBankAccount &&
      !bill.payment?.isAtmBankCodeExpired,
    [bill, settingPaymentMethod],
  );

  if (!bill?.id) return null;

  return (
    <>
      {modal}

      <div className={styles.root}>
        <div>
          <div>{formatMonth(bill.month)}</div>

          <div className={`${styles.paymentStatue} ${styles[paymentStatue]}`}>
            {t(`payment-status.${paymentStatue}`)}
          </div>
        </div>

        {paymentStatue !== 'unpaid' ? null : (
          <div>
            {!settingPaymentMethod ? null : (
              <Button
                onClick={() =>
                  setPaymentType(
                    settingPaymentMethod === 'ATM'
                      ? 'CREDIT_CARD'
                      : 'ATM_CHECK',
                  )
                }
              >
                {t('other-payment-methods')}
              </Button>
            )}

            {hasGotBankAccount ? null : (
              <Button
                type="primary"
                onClick={() => setPaymentType(settingPaymentMethod || 'ALL')}
              >
                {settingPaymentMethod === 'ATM'
                  ? t('get-bank-account')
                  : t('immediate-payment')}
              </Button>
            )}
          </div>
        )}
      </div>

      {!(
        (paymentStatue === 'paid' && actualPaymentMethod === 'CREDIT_CARD') ||
        hasGotBankAccount
      ) ? null : (
        <div className={styles.paymentMethod}>
          <div>
            <div>{t('info.payment-method')}</div>
            {actualPaymentMethod === 'CREDIT_CARD' ? (
              <>
                <div>{t('info.credit-card')}</div>
                <div>{`**** **** **** ${bill.payment?.creditCardLastFourDigit}`}</div>
              </>
            ) : (
              <>
                <div>{t('info.atm')}</div>
                <div>
                  {`${t('info.bank-code')}：${bill.payment?.atmBankCode}`}
                </div>
                <div>
                  {`${t('info.bank-account')}：${bill.payment?.atmBankAccount}`}
                </div>
              </>
            )}
          </div>

          <div>
            <div>{t('info.payment-fee')}</div>
            <div>
              {bill.currency === 'TWD'
                ? `TWD ${formatMoney(bill.localTotalFee, true)}`
                : `USD ${formatMoney(bill.totalFee)}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
});
