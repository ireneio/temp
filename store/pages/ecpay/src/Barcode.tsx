// import
import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

import { useTranslation } from '@meepshop/locales';
import { ecpayConvenienceStore4 } from '@meepshop/images';

import PaymentInfo from './PaymentInfo';
import { BARCODE_OPTION } from './constants';
import styles from './styles/barcode.less';

// graphql typescript
import {
  paymentFragment as paymentFragmentType,
  ecPay2CreatePayment_ecPay2CreatePayment_OrderPaymentBarcode as ecPay2CreatePaymentEcPay2CreatePaymentOrderPaymentBarcode,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType
  extends Omit<
    ecPay2CreatePaymentEcPay2CreatePaymentOrderPaymentBarcode,
    '__typename'
  > {
  viewer: paymentFragmentType;
}

// definition
export default React.memo(
  ({ viewer, barcode1, barcode2, barcode3, expireDate }: PropsType) => {
    const { t } = useTranslation('ecpay');
    const barcode1Ref = useRef(null);
    const barcode2Ref = useRef(null);
    const barcode3Ref = useRef(null);

    useEffect(() => {
      if (barcode1) JsBarcode(barcode1Ref.current, barcode1, BARCODE_OPTION);
      if (barcode2) JsBarcode(barcode2Ref.current, barcode2, BARCODE_OPTION);
      if (barcode3) JsBarcode(barcode3Ref.current, barcode3, BARCODE_OPTION);
    }, [barcode1, barcode2, barcode3]);

    return (
      <PaymentInfo viewer={viewer} type="barcode" expireDate={expireDate}>
        <div className={styles.root}>
          <img src={ecpayConvenienceStore4} alt="ecpayConvenienceStore4" />
          <div>{t('barcode.description-1')}</div>
          <div>{t('barcode.description-2')}</div>

          <svg ref={barcode1Ref} />
          <svg ref={barcode2Ref} />
          <svg ref={barcode3Ref} />
        </div>
      </PaymentInfo>
    );
  },
);
