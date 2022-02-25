// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';
import Header from '@admin/header';
import Table from '@admin/table';

import Empty from './Empty';
import styles from './styles/index.less';
import useGetAffiliatePartners from './hooks/useGetAffiliatePartners';
import usePartnersColumns from './hooks/usePartnersColumns';

// graphql typescript
import { usePartnersColumnsFragment as usePartnersColumnsFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { usePartnersColumnsFragment } from './gqls/usePartnersColumns';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Search } = Input;

const AffiliatePartners: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('affiliate-partners');
  const router = useRouter();
  const columns = usePartnersColumns();
  const {
    loading,
    refetch,
    affiliatePartners,
    noAffiliatePartners,
    current,
    onChange,
  } = useGetAffiliatePartners();

  return (
    <Header
      title={t('title')}
      link={{
        text: t('instruction'),
        url: '',
      }}
      buttons={
        <Link href="/affiliate/programs">
          <Button className={styles.programs}>{t('manage-programs')}</Button>
        </Link>
      }
    >
      <Table<usePartnersColumnsFragmentType>
        className={`${styles.affiliatePartners} ${
          !noAffiliatePartners ? '' : styles.empty
        }`}
        loading={loading}
        dataSource={filter(
          usePartnersColumnsFragment,
          (affiliatePartners?.edges || []).slice(
            current * 10,
            (current + 1) * 10,
          ),
        )}
        columns={columns}
        pagination={{
          total: affiliatePartners?.total || 0,
          current,
          pageSizeOptions: [],
          onChange,
        }}
        locale={{ emptyText: t('not-match') }}
        rowClassName={styles.rowClassName}
        onRow={({ node: { id } }) => ({
          onClick: () => router.push(`/affiliate/partners/${id}`),
        })}
        rowKey={({ node: { id } }) => id}
      >
        <div
          className={`${styles.root} ${
            !noAffiliatePartners ? '' : styles.empty
          }`}
        >
          <Search
            placeholder={t('search')}
            onSearch={value =>
              refetch({
                filter: { searchTerm: value },
              })
            }
          />

          <Button type="link" onClick={() => refetch({ filter: null })}>
            {t('clear')}
          </Button>

          <div className={styles.space} />

          <Link href="/affiliate/partners/add">
            <Button type="primary">{t('add')}</Button>
          </Link>
        </div>

        {!noAffiliatePartners ? null : <Empty />}
      </Table>
    </Header>
  );
});

AffiliatePartners.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default AffiliatePartners;
