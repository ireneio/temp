// typescript import
import { NextPage } from 'next';

// import
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { ShieldIcon } from '@meepshop/icons';
import filter from '@meepshop/utils/lib/filter';

// Use to copy mixin.less
import './styles/mixin.less';

import Payment from './Payment';
import OrderInfo from './OrderInfo';
import ATM from './ATM';
import CVS from './CVS';
import Barcode from './Barcode';
import styles from './styles/index.less';

// graphql typescript
import {
  getOrderInEcpay as getOrderInEcpayType,
  ecPay2CreatePayment_ecPay2CreatePayment as ecPay2CreatePaymentEcPay2CreatePayment,
} from '@meepshop/types/gqls/store';

// graphql import
import { getOrderInEcpay } from './gqls';
import { orderInfoFragment } from './gqls/orderInfo';
import { paymentFragment } from './gqls/payment';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  orderId: string;
  token: string;
}

// definition
const Ecpay: NextPage<PropsType> = React.memo(
  ({ orderId, token }: PropsType) => {
    const { t } = useTranslation('ecpay');
    const { push } = useRouter();
    const [paymentInfo, setPaymentInfo] = useState<
      ecPay2CreatePaymentEcPay2CreatePayment | undefined
    >();
    const { loading, data } = useQuery<getOrderInEcpayType>(getOrderInEcpay, {
      variables: { orderId },
    });

    const isCreditPayment = useMemo(
      () =>
        /CREDIT/.test(
          data?.viewer?.order?.paymentInfo?.list?.[0]?.accountInfo?.ecpay2
            ?.ChoosePayment || '',
        ),
      [data],
    );

    useEffect(() => {
      if (
        data &&
        data.viewer?.order?.paymentInfo?.list?.[0]?.template !== 'ecpay2'
      )
        push('/');
    }, [data, push]);

    if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

    if (data?.viewer?.order?.paymentInfo?.list?.[0]?.template !== 'ecpay2')
      return null;

    const logoImage = data.viewer.store?.logoImage?.scaledSrc?.h200 || '';

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <img src={logoImage} alt="logoImage" />
        </div>

        {!paymentInfo ? (
          <>
            <div className={styles.warning}>
              <ShieldIcon />

              {isCreditPayment ? t('warning.1') : t('warning.0')}
            </div>

            <div className={styles.content}>
              <Payment
                token={token}
                viewer={filter(paymentFragment, data.viewer)}
                setPaymentInfo={setPaymentInfo}
              />

              <OrderInfo viewer={filter(orderInfoFragment, data.viewer)} />
            </div>
          </>
        ) : null}

        {paymentInfo?.__typename === 'OrderPaymentAtm' ? (
          <ATM viewer={filter(paymentFragment, data.viewer)} {...paymentInfo} />
        ) : null}

        {paymentInfo?.__typename === 'OrderPaymentCVSPayCode' ? (
          <CVS viewer={filter(paymentFragment, data.viewer)} {...paymentInfo} />
        ) : null}

        {paymentInfo?.__typename === 'OrderPaymentBarcode' ? (
          <Barcode
            viewer={filter(paymentFragment, data.viewer)}
            {...paymentInfo}
          />
        ) : null}
      </div>
    );
  },
);

Ecpay.getInitialProps = async ({ query: { orderId, token } }) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof orderId !== 'string')
    throw new Error('[FIXME] orderId is undefined');

  if (typeof token !== 'string') throw new Error('[FIXME] token is undefined');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    orderId,
    token,
  };
};

export default Ecpay;
