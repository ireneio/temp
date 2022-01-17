// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { Input, Button } from 'antd';

import FilterButtons from '@admin/filter-buttons';
import Header from '@admin/header';
import Table from '@admin/table';
import { useTranslation } from '@meepshop/locales';

import useGetProducts from './hooks/useGetProducts';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import { useColumnsProductFragment as useColumnsProductFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Search } = Input;

const ProductsDesignatedPayments: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('products-designated-payments');
  const {
    loading,
    products,
    variables,
    refetch,
    current,
    pageSize,
    changePage,
  } = useGetProducts();
  const columns = useColumns();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <Header
      title={t('title')}
      prevTitle={t('common:products')}
      backTo="/orders"
      link={{
        text: t('instruction'),
        url: '',
      }}
    >
      <Table<useColumnsProductFragmentType>
        rowKey="id"
        rowClassName={() => styles.row}
        locale={{ emptyText: t('empty') }}
        loading={loading}
        dataSource={(products?.edges || [])
          .slice(current * pageSize, (current + 1) * pageSize)
          .map(edge => edge?.node)}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedIds,
          onChange: (ids: string[]) => setSelectedIds(ids),
        }}
        optional={
          selectedIds.length === 0 ? null : (
            <>
              {t('selected')}
              <span className={styles.selected}>{selectedIds.length}</span>

              {t('count')}
            </>
          )
        }
        pagination={{
          total: products?.total || 0,
          current,
          pageSize,
          pageSizeOptions: ['10', '20', '50', '100', '500'],
          onChange: changePage,
        }}
      >
        <>
          <div className={styles.header}>
            <div>
              <Search
                className={styles.search}
                placeholder={t('search')}
                onSearch={newSearchTerm =>
                  refetch({
                    filter: {
                      ...variables?.filter,
                      searchTerm: newSearchTerm,
                    },
                  })
                }
              />

              <FilterButtons
                filters={[
                  {
                    text: t('product.tags'),
                    value: 'tags',
                    children: <div />,
                  },
                  {
                    text: t('product.applicable-shipments'),
                    value: 'applicableShipments',
                    children: <div />,
                  },
                ]}
              />
            </div>

            <Button type="primary">{t('change-applicable-shipments')}</Button>
          </div>
          {/* // FIXME: add tags view after T9544 */}
        </>
      </Table>
    </Header>
  );
});

ProductsDesignatedPayments.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default ProductsDesignatedPayments;
