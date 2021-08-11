// import
import React, { useContext, useState } from 'react';
import Head from 'next/head';
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
import { paymentFragment as paymentFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  viewer: paymentFragmentType;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('ecpay');
  const { c } = useContext(CurrencyContext);
  const { isMobile } = useContext(SensorContext);
  const colors = useContext(ColorsContext);
  const { isCreditPayment, ecpayScript, ecPay2CreatePayment } = usePayment(
    viewer,
  );
  const [isAffixed, setIsAffixed] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const amount = viewer.order?.priceInfo?.total || 0;

  return (
    <div className={styles.root}>
      <Head>{ecpayScript}</Head>

      <div className={styles.title}>
        <WalletIcon />
        {t('payment.title')}
      </div>

      <div id="ECPayPayment" />

      <Modal
        className={styles.modal}
        visible={openModal}
        onOk={() => {
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
            className={styles.affix}
            offsetBottom={72}
            onChange={affixed => setIsAffixed(affixed || false)}
          >
            {children}
          </Affix>
        )}
      >
        <div className={styles.button}>
          <Button
            className={isAffixed ? styles.affixed : ''}
            onClick={() =>
              isCreditPayment ? setOpenModal(true) : ecPay2CreatePayment()
            }
            loading={false}
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
