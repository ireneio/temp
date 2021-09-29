// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

import PaymentInfo from './PaymentInfo';
import styles from './styles/atm.less';

// graphql typescript
import {
  paymentFragment as paymentFragmentType,
  ecPay2CreatePayment_ecPay2CreatePayment_OrderPaymentAtm as ecPay2CreatePaymentEcPay2CreatePaymentOrderPaymentAtm,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType
  extends Omit<
    ecPay2CreatePaymentEcPay2CreatePaymentOrderPaymentAtm,
    '__typename'
  > {
  viewer: paymentFragmentType;
}

// definition
export default React.memo(
  ({ viewer, bankCode, account, expireDate }: PropsType) => {
    const { t } = useTranslation('ecpay');

    return (
      <PaymentInfo viewer={viewer} type="atm" expireDate={expireDate}>
        {[
          { text: t('atm.bank-code'), value: bankCode },
          { text: t('atm.account'), value: account },
        ].map(({ text, value }) => (
          <div className={styles.root}>
            <div>{text}</div>
            <div>{value}</div>
          </div>
        ))}
      </PaymentInfo>
    );
  },
);
