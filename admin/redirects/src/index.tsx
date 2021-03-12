// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { Spin, Icon } from 'antd';
import { filter } from 'graphql-anywhere';
import { useQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

import Header from '@admin/header';
import Table from '@admin/table';

import Modal from './Modal';
import useColumns from './hooks/useColumns';
import useChangePage from './hooks/useChangePage';
import styles from './styles/index.less';

// graphql typescript
import {
  getRedirects as getRedirectsType,
  useColumnsStoreFragment as useColumnsStoreFragmentType,
  useColumnsRoutingRuleFragment as useColumnsRoutingRuleFragmentType,
  modalFragmet as modalFragmetType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getRedirects } from './gqls';
import {
  useColumnsStoreFragment,
  useColumnsRoutingRuleFragment,
} from './gqls/useColumns';
import { modalFragmet } from './gqls/modal';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const Redirects: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('redirects');
  const { data } = useQuery<getRedirectsType>(getRedirects);
  const { loading, pageSize, current, changePage } = useChangePage();

  const routingRules = data?.viewer?.store?.routingRules || [];

  const columns = useColumns(
    filter<useColumnsStoreFragmentType>(
      useColumnsStoreFragment,
      data?.viewer?.store || null,
    ),
  );

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <Header
      title={t('title')}
      prevTitle={t('common:setting')}
      backTo="/setting"
    >
      <div className={styles.top}>
        <div>
          <p>{t('subTitle')}</p>
        </div>
        <Modal
          user={filter<modalFragmetType>(
            modalFragmet,
            data.viewer?.store || null,
          )}
          type="primary"
        >
          {t('actions.add')}
          <Icon type="plus" />
        </Modal>
      </div>
      <div className={styles.root}>
        <Table
          loading={loading}
          pagination={{
            total: routingRules.length,
            current,
            pageSize,
            onChange: changePage,
          }}
          optional={<span className={styles.total}>{t('limited')}</span>}
          locale={{ emptyText: t('emptyText') }}
          dataSource={filter<useColumnsRoutingRuleFragmentType[]>(
            useColumnsRoutingRuleFragment,
            routingRules.slice(current * pageSize, (current + 1) * pageSize),
          )}
          columns={columns}
          rowKey={item => item.id}
          rowClassName={() => styles.row}
        />
      </div>
    </Header>
  );
});

Redirects.getInitialProps = async () => ({
  namespacesRequired: ['redirects'],
});

export default Redirects;
