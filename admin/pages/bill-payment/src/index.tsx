// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';
import Header from '@admin/header';
import Table from '@admin/table';

import Alert from './Alert';
import useGetBills from './hooks/useGetBills';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql import
import { alertFragment } from './gqls/alert';
import { useColumnsFragment } from './gqls/useColumns';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const BillPayment: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('bill-payment');
  const { loading, store, current, changePage } = useGetBills();
  const columns = useColumns(filter(useColumnsFragment, store));

  return (
    <Header
      title={t('title')}
      description={t('description')}
      buttons={
        <div className={styles.button}>
          <Link href="/bill-payment/setting">
            <Button type="primary">{t('payment-setting')}</Button>
          </Link>
        </div>
      }
    >
      <div className={styles.root}>
        <Alert store={filter(alertFragment, store)} />

        <Table
          rowKey={
            ({ node: { id } }) => id || 'null-id' /** SHOULD_NOT_BE_NULL */
          }
          rowClassName={() => styles.row}
          locale={{ emptyText: t('empty') }}
          loading={loading}
          dataSource={(store?.bills?.edges || []).slice(
            current * 10,
            (current + 1) * 10,
          )}
          columns={columns}
          pagination={{
            total: store?.bills?.total || 0,
            current,
            pageSize: 10,
            pageSizeOptions: [],
            onChange: changePage,
          }}
        />
      </div>

      <div className={styles.email}>{t('email-to')}</div>
    </Header>
  );
});

BillPayment.getInitialProps = async () => ({
  namespacesRequired: ['bill-payment'],
});

export default BillPayment;
