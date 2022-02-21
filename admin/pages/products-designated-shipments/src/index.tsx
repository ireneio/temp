// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Input, Button } from 'antd';

import FilterButtons from '@admin/filter-buttons';
import Header from '@admin/header';
import Table from '@admin/table';
import { useTranslation } from '@meepshop/locales';

import ApplicableShipmentsModal from './ApplicableShipmentsModal';
import useGetProducts from './hooks/useGetProducts';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import {
  getStoreShipments as getStoreShipmentsType,
  useColumnsProductFragment as useColumnsProductFragmentType,
  getAdminProducts_viewer_store_adminProducts_edges_node as getAdminProductsViewerStoreAdminProductsEdgesNodeType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getStoreShipments } from './gqls';
import {
  applicableShipmentsModalProductFragment,
  applicableShipmentsModalStoreShipmentFragment,
} from './gqls/applicableShipmentsModal';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Search } = Input;

const ProductsDesignatedShipments: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('products-designated-shipments');
  const { data } = useQuery<getStoreShipmentsType>(getStoreShipments);
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
  const [selectedProducts, setSelectedProducts] = useState<
    getAdminProductsViewerStoreAdminProductsEdgesNodeType[]
  >([]);
  const [openModal, setOpenModal] = useState(false);

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
          selectedRowKeys: selectedProducts.map(
            selectedProduct => selectedProduct.id || '',
          ),
          onChange: (_, selectedRows) => setSelectedProducts(selectedRows),
        }}
        optional={
          selectedProducts.length === 0 ? null : (
            <>
              {t('selected')}
              <span className={styles.selected}>{selectedProducts.length}</span>
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

            {selectedProducts.length === 0 ? null : (
              <Button type="primary" onClick={() => setOpenModal(true)}>
                {t('change-applicable-shipments')}
              </Button>
            )}
          </div>
          {/* // FIXME: add tags view after T9544 */}
        </>
      </Table>

      {!openModal ? null : (
        <ApplicableShipmentsModal
          selectedProducts={filter(
            applicableShipmentsModalProductFragment,
            selectedProducts,
          )}
          shipments={filter(
            applicableShipmentsModalStoreShipmentFragment,
            data?.viewer?.store?.storeShipments || [],
          )}
          close={() => setOpenModal(false)}
        />
      )}
    </Header>
  );
});

ProductsDesignatedShipments.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default ProductsDesignatedShipments;
