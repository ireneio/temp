// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';
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
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  return (
    <Header
      title={t('title')}
      link={{
        text: t('instruction'),
        url:
          'https://supportmeepshop.com/knowledgebase/%e5%88%86%e6%bd%a4%e5%8a%9f%e8%83%bd/',
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
            value={searchTerm}
            onChange={({ target: { value } }) => setSearchTerm(value)}
            onSearch={value =>
              refetch({
                filter: { searchTerm: value },
              })
            }
          />

          <Button
            type="link"
            onClick={() => {
              refetch({ filter: null });
              setSearchTerm(undefined);
            }}
          >
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
