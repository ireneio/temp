// import
import React, { useContext, useState, useEffect } from 'react';
import { Affix, Button, Modal } from 'antd';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
  Sensor as SensorContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import { WalletIcon } from '@meepshop/icons';
import Switch from '@meepshop/switch';

import usePayment from './hooks/usePayment';
import styles from './styles/payment.less';

// graphql typescript
import {
  paymentFragment as paymentFragmentType,
  ecPay2CreatePayment_ecPay2CreatePayment as ecPay2CreatePaymentEcPay2CreatePayment,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  token: string;
  viewer: paymentFragmentType;
  setPaymentInfo: (paymentInfo: ecPay2CreatePaymentEcPay2CreatePayment) => void;
}

// definition
export default React.memo(({ token, viewer, setPaymentInfo }: PropsType) => {
  const { t } = useTranslation('ecpay');
  const { c } = useContext(CurrencyContext);
  const { isMobile } = useContext(SensorContext);
  const colors = useContext(ColorsContext);
  const {
    ecpayLoading,
    isCreditPayment,
    loading,
    isRedirecting,
    ecpayScript,
    ecPay2CreatePayment,
  } = usePayment(token, viewer, setPaymentInfo);
  const [isAffixed, setIsAffixed] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const beforeunload = (e: Event): string => {
      if (isRedirecting) return '';

      e.preventDefault();
      e.returnValue = true;
      return '';
    };

    window.addEventListener('beforeunload', beforeunload);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  });

  const amount = viewer.order?.priceInfo?.total || 0;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <WalletIcon />
        {t('payment.title')}
      </div>

      <div id="ECPayPayment" />

      {ecpayScript}

      <Modal
        className={styles.modal}
        visible={openModal}
        onOk={() => {
          if (loading || isRedirecting) return;

          ecPay2CreatePayment();
          setOpenModal(false);
        }}
        onCancel={() => setOpenModal(false)}
        okText={t('ok')}
        cancelText={t('cancel')}
        centered
        closable={false}
      >
        {`${t('payment.pay-by-credit-card')} ${c(amount)} ?`}
      </Modal>

      <Switch
        isTrue={isMobile}
        render={children => (
          <Affix
            offsetBottom={0}
            onChange={affixed => setIsAffixed(affixed || false)}
          >
            {children}
          </Affix>
        )}
      >
        <div className={styles.button}>
          <Button
            className={isAffixed ? styles.affixed : ''}
            onClick={() => {
              if (loading || isRedirecting) return;

              if (isCreditPayment) {
                setOpenModal(true);
                return;
              }

              ecPay2CreatePayment();
            }}
            loading={loading}
            disabled={ecpayLoading}
          >
            {isCreditPayment
              ? `${t('payment.immediate-payment')} ${c(amount)}`
              : t('payment.button')}
          </Button>
        </div>
      </Switch>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.modal} .ant-modal-content {
              background-color: ${colors[0]};
            }

            .${styles.modal} .ant-modal-footer .ant-btn {
              background-color: transparent;
              border-color: ${colors[5]};
              color: ${colors[3]};
            }

            .${styles.modal} .ant-modal-footer .ant-btn-primary {
              background-color: ${colors[4]};
              border-color: ${colors[4]};
              color: ${colors[3]};
            }
          `,
        }}
      />
    </div>
  );
});
