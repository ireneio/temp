// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Row, Col } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

import Info from './Info';
import Total from './Total';
import useGetBill from './hooks/useGetBill';
import useItems from './hooks/useItems';
import styles from './styles/index.less';

// Use to copy mixin.less
import './styles/mixin.less';

// graphql import
import { infoFragment } from './gqls/info';
import { paymentStoreBillingSettingFragment } from './gqls/payment';
import { useItemsStoreBillFragment } from './gqls/useItems';
import { totalFragment } from './gqls/total';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const Bill: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('bill');
  const { bill, billing } = useGetBill();
  const items = useItems(filter(useItemsStoreBillFragment, bill));

  if (!bill?.id) return null;

  return (
    <Header
      title={t('title')}
      prevTitle={t('common:bill-payment')}
      backTo="/bill-payment"
    >
      <div className={styles.root}>
        <Info
          bill={filter(infoFragment, bill)}
          billing={filter(paymentStoreBillingSettingFragment, billing)}
        />

        {items.map(({ name, description, month, fee }) => (
          <Row key={name}>
            <Col>{name}</Col>
            <Col>{description}</Col>
            <Col>{month}</Col>
            <Col>{fee}</Col>
          </Row>
        ))}

        <Total bill={filter(totalFragment, bill)} />
      </div>
    </Header>
  );
});

Bill.getInitialProps = async () => ({
  namespacesRequired: ['bill'],
});

export default Bill;
