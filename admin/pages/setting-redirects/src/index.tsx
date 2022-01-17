// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

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
  const { t } = useTranslation('setting-redirects');
  const { data } = useQuery<getRedirectsType>(getRedirects);
  const { loading, pageSize, current, changePage } = useChangePage();

  const routingRules = data?.viewer?.store?.routingRules || [];

  const columns = useColumns(
    filter<useColumnsStoreFragmentType>(
      useColumnsStoreFragment,
      data?.viewer?.store || null,
    ),
  );

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Header
      title={
        <>
          {t('title')}
          <div className={styles.subTitle}>{t('subTitle')}</div>
        </>
      }
      prevTitle={t('common:setting')}
      backTo="/setting"
      disableAffix
      buttons={
        <Modal
          user={filter<modalFragmetType>(
            modalFragmet,
            data.viewer?.store || null,
          )}
          type="primary"
          className={styles.addBtn}
        >
          {t('actions.add')}
          <PlusOutlined />
        </Modal>
      }
    >
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
          rowClassName={() => styles.row}
          rowKey="id"
        />
      </div>
    </Header>
  );
});

Redirects.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Redirects;
