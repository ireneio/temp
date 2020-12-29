// typescript import
import { SelectedPlanType } from './hooks/usePayment';

// import
import React, { useState } from 'react';
import moment from 'moment';
import { Icon, Radio, Divider, Button } from 'antd';

import TapPay from '@admin/tap-pay';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import useQuotation from './hooks/useQuotation';
import usePayment from './hooks/usePayment';
import styles from './styles/payment.less';

// typescript definition
interface PropsType {
  plan: SelectedPlanType;
  setPlan: (input: null) => void;
}

// definition
export default React.memo(({ plan, setPlan }: PropsType) => {
  const { t, i18n } = useTranslation('plan-setting');
  const [feeType, setFeeType] = useState(plan.feeType);
  const {
    quotation,
    fxRate,
    isTWD,
    isDiscounted,
    isNoNeedToPay,
    refetch,
  } = useQuotation(plan, feeType);
  const { hasErrors, setPrime, loading, launchStore, success } = usePayment(
    plan,
    feeType,
    quotation,
    isNoNeedToPay,
    refetch,
  );

  return (
    <>
      <div className={styles.backTo} onClick={() => setPlan(null)}>
        <Icon type="left" />
        {t('payment.back-to')}
      </div>

      <div className={styles.title}>{t('payment.title')}</div>

      <div className={styles.bill}>
        <div>
          <div>{t('payment.billing-method')}</div>

          <Radio.Group
            value={feeType}
            onChange={e => setFeeType(e.target.value)}
          >
            {['YEARLY', 'MONTHLY'].map(value => (
              <Radio key={value} value={value}>
                {`${t(`payment.per-${value.toLowerCase()}`)} USD ${
                  plan?.[
                    `${value.toLowerCase()}Fee` as 'monthlyFee' | 'yearlyFee'
                  ]
                }`}

                {value !== 'YEARLY' ? null : (
                  <span className={styles.save}>
                    {`${t('payment.save')} USD ${(
                      plan?.monthlyFee * 12 -
                      plan?.yearlyFee
                    ).toFixed(1)}`}
                  </span>
                )}
              </Radio>
            ))}
          </Radio.Group>

          <div>{t('payment.credit-card-information')}</div>

          <TapPay
            setPrime={value => setPrime(value)}
            hasErrors={hasErrors}
            loading={loading}
            success={success}
          />

          <div className={styles.prompt}>
            <div>{t('payment.bind-credit-card')}</div>
            <div>
              {!isNoNeedToPay
                ? t('payment.automatic-renewal')
                : t('payment.try-to-swipe')}
            </div>
          </div>
        </div>

        <div>
          <div>{t('payment.purchase-item')}</div>

          <div className={styles.plan}>
            {`${
              plan?.name[i18n.language === 'zh_TW' ? 'zh_TW' : 'en_US']
            } / ${t(`payment.${feeType.toLowerCase()}-payment-plan`)}`}
          </div>

          <div className={styles.expiryDate}>
            {`${t('payment.expiry')}：`}
            {moment(quotation?.billingEndAt).format('YYYY/MM/DD')}
          </div>

          <Divider />

          {!isTWD ? null : (
            <div className={styles.billing}>
              <div>
                {t(`payment.billing-for-first-${feeType.toLowerCase()}`)}
              </div>
              <div>{`USD ${quotation?.total.usd}`}</div>
            </div>
          )}

          {!isDiscounted ? null : (
            <div className={styles.discount}>
              <Icon type="check" />
              {t('payment.discount')}
            </div>
          )}

          <Divider />

          <div className={styles.total}>
            <div>
              {isTWD
                ? t('payment.total')
                : t(`payment.total-for-first-${feeType.toLowerCase()}`)}
            </div>
            <div>
              {isTWD ? 'TWD ' : 'USD '}
              {quotation?.total[isTWD ? 'twd' : 'usd']}
            </div>
          </div>

          {!isTWD ? null : (
            <div className={styles.exchangeRate}>
              {`${t('payment.USD-exchange-rate-today')}：${fxRate}`}
            </div>
          )}

          {!isNoNeedToPay ? null : (
            <div className={styles.congratulation}>
              <Divider />
              {t('payment.congratulation-no-payment')}
            </div>
          )}

          <Button type="primary" size="large" onClick={() => launchStore()}>
            {!isNoNeedToPay
              ? t('payment.confirm-payment')
              : t('payment.verify-credit-card')}
          </Button>

          <div className={styles.agree}>
            {!isNoNeedToPay
              ? t('payment.agree-confirm-payment')
              : t('payment.agree-verify-credit-card')}
            <a
              href="https://meepshop.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('payment.service')}
            </a>
            {t('payment.and')}
            <a
              href="https://www.meepshop.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('payment.privacy')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
});
