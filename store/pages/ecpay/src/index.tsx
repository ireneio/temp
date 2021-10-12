// typescript import
import { NextPage } from 'next';

// import
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { ShieldIcon } from '@meepshop/icons';

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
  PaymentTemplateEnum,
  ECPay2PaymentTypeEnum,
} from '@meepshop/types/gqls/store';

// graphql import
import { getOrderInEcpay } from './gqls';
import { orderInfoFragment } from './gqls/orderInfo';
import { paymentFragment } from './gqls/payment';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const Ecpay: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('ecpay');
  const { query, push } = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<
    ecPay2CreatePaymentEcPay2CreatePayment | undefined
  >();
  const { loading, data } = useQuery<getOrderInEcpayType>(getOrderInEcpay, {
    variables: { orderId: query.orderId },
  });

  // FIXME: landing page issue
  const viewer = useMemo(
    () => ({
      __typename: 'User' as const,
      id: '',
      store: null,
      ...data?.viewer,
      order: {
        __typename: 'Order' as const,
        id: data?.viewer?.order?.id || (query.orderId as string),
        orderNo: data?.viewer?.order?.orderNo || (query.orderNo as string),
        priceInfo: {
          __typename: 'priceObjectType' as const,
          total:
            data?.viewer?.order?.priceInfo?.total ||
            parseFloat(query.total as string),
        },
        paymentInfo: {
          __typename: 'paymentInfoType' as const,
          list: [
            {
              __typename: 'paymentObjectType' as const,
              template:
                data?.viewer?.order?.paymentInfo?.list?.[0]?.template ||
                (query.template as PaymentTemplateEnum),
              accountInfo: {
                __typename: 'PaymentAccount' as const,
                ecpay2: {
                  __typename: 'PaymentAccountForECPay2' as const,
                  ChoosePayment:
                    data?.viewer?.order?.paymentInfo?.list?.[0]?.accountInfo
                      ?.ecpay2?.ChoosePayment ||
                    (query.choosePayment as ECPay2PaymentTypeEnum),
                },
              },
            },
          ],
        },
      },
    }),
    [data, query],
  );

  const isCreditPayment = useMemo(
    () =>
      /CREDIT/.test(
        viewer.order?.paymentInfo?.list?.[0]?.accountInfo?.ecpay2
          ?.ChoosePayment || '',
      ),
    [viewer],
  );

  useEffect(() => {
    if (data && viewer.order?.paymentInfo?.list?.[0]?.template !== 'ecpay2')
      push('/');
  }, [data, viewer, push]);

  if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

  if (viewer.order?.paymentInfo?.list?.[0]?.template !== 'ecpay2') return null;

  const logoImage = viewer.store?.logoImage?.scaledSrc?.h200 || '';

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
              viewer={filter(paymentFragment, viewer)}
              setPaymentInfo={setPaymentInfo}
            />

            <OrderInfo viewer={filter(orderInfoFragment, viewer)} />
          </div>
        </>
      ) : null}

      {paymentInfo?.__typename === 'OrderPaymentAtm' ? (
        <ATM viewer={filter(paymentFragment, viewer)} {...paymentInfo} />
      ) : null}

      {paymentInfo?.__typename === 'OrderPaymentCVSPayCode' ? (
        <CVS viewer={filter(paymentFragment, viewer)} {...paymentInfo} />
      ) : null}

      {paymentInfo?.__typename === 'OrderPaymentBarcode' ? (
        <Barcode viewer={filter(paymentFragment, viewer)} {...paymentInfo} />
      ) : null}
    </div>
  );
});

Ecpay.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Ecpay;
