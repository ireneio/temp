// import
import React, { useEffect, useMemo } from 'react';
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
import styles from './styles/index.less';

// graphql typescript
import { getOrderInEcpay as getOrderInEcpayType } from '@meepshop/types/gqls/store';

// graphql import
import { getOrderInEcpay } from './gqls';
import { orderInfoFragment } from './gqls/orderInfo';
import { paymentFragment } from './gqls/payment';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const { t } = useTranslation('ecpay');
  const { query, push } = useRouter();
  const { loading, data } = useQuery<getOrderInEcpayType>(getOrderInEcpay, {
    variables: { orderId: query.orderId },
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
    if (data?.viewer?.order?.paymentInfo?.list?.[0]?.template !== 'ecpay2')
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

      <div className={styles.warning}>
        <ShieldIcon />

        {isCreditPayment ? t('warning.1') : t('warning.0')}
      </div>

      <div className={styles.content}>
        <Payment viewer={filter(paymentFragment, data.viewer)} />

        <OrderInfo viewer={filter(orderInfoFragment, data.viewer)} />
      </div>
    </div>
  );
});
