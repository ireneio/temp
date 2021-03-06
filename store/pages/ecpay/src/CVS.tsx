// import
import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useCopyToClipboard } from 'react-use';

import { useTranslation } from '@meepshop/locales';
import {
  ecpayConvenienceStore3,
  ecpayConvenienceStore4,
} from '@meepshop/images';

import PaymentInfo from './PaymentInfo';
import styles from './styles/cvs.less';

// graphql typescript
import {
  paymentFragment as paymentFragmentType,
  ecPay2CreatePayment_ecPay2CreatePayment_OrderPaymentCVSPayCode as ecPay2CreatePaymentEcPay2CreatePaymentOrderPaymentCVSPayCode,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType
  extends Omit<
    ecPay2CreatePaymentEcPay2CreatePaymentOrderPaymentCVSPayCode,
    '__typename'
  > {
  viewer: paymentFragmentType;
}

// definition
export default React.memo(
  ({ viewer, payCode, paymentURL, expireDate }: PropsType) => {
    const { t } = useTranslation('ecpay');
    const [{ value: copyValue }, copyToClipboard] = useCopyToClipboard();
    const [copyTimes, setCopyTimes] = useState<number>(0);

    useEffect(() => {
      if (copyValue) message.success(t('cvs.copy-success'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [copyValue, copyTimes]);

    return (
      <PaymentInfo viewer={viewer} type="cvs" expireDate={expireDate}>
        <div className={styles.root}>
          <div className={styles.title}>
            {t('cvs.choose-code')}
            <img src={ecpayConvenienceStore4} alt="ecpayConvenienceStore4" />
          </div>
          <div>{t('cvs.choose-code-1')}</div>
          <div>{t('cvs.choose-code-2')}</div>

          <div className={styles.code}>{payCode}</div>

          <a
            href="https://www.ecpay.com.tw/service/pay_way_cvpay"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('cvs.instruction')}
          </a>

          <div className={styles.title}>
            {t('cvs.choose-barcode')}
            <img src={ecpayConvenienceStore3} alt="ecpayConvenienceStore3" />
          </div>
          <div>{t('cvs.choose-barcode-1')}</div>
          <div>{t('cvs.choose-barcode-2')}</div>

          {!paymentURL ? null : (
            <a
              className={styles.link}
              href={paymentURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {paymentURL}
            </a>
          )}

          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <Button
            onClick={() => {
              copyToClipboard(paymentURL || '');
              setCopyTimes(copyTimes + 1);
            }}
          >
            {t('cvs.copy')}
          </Button>
        </div>
      </PaymentInfo>
    );
  },
);
