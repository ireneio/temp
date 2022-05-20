// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Input, Button, Tag, Popover } from 'antd';
import { TagFilled } from '@ant-design/icons';

import FilterButtons from '@admin/filter-buttons';
import Header from '@admin/header';
import Table from '@admin/table';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { ShippingTruckFilledIcon } from '@meepshop/icons';
import filter from '@meepshop/utils/lib/filter';

import ApplicableShipmentsModal from './ApplicableShipmentsModal';
import FilterProductTag from './FilterProductTag';
import FilterShipment from './FilterShipment';
import useGetProducts from './hooks/useGetProducts';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import {
  getStoreShipments as getStoreShipmentsType,
  useColumnsProductFragment as useColumnsProductFragmentType,
  getStoreShipments_viewer_store_storeShipments as getStoreShipmentsViewerStoreStoreShipmentsType,
  getAdminProducts_viewer_store_adminProducts_edges_node as getAdminProductsViewerStoreAdminProductsEdgesNodeType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getStoreShipments } from './gqls';
import {
  applicableShipmentsModalProductFragment,
  applicableShipmentsModalStoreShipmentFragment,
  applicableShipmentsModalAdminProductsConnectionFragment,
} from './gqls/applicableShipmentsModal';
import { filterProductTagFragment } from './gqls/filterProductTag';
import { filterShipmentFragment } from './gqls/filterShipment';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Search } = Input;

const ProductsDesignatedShipments: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('products-designated-shipments');
  const getLanguage = useGetLanguage();
  const { data } = useQuery<getStoreShipmentsType>(getStoreShipments, {
    variables: {
      search: {
        filter: {
          and: [
            {
              type: 'exact',
              field: 'type',
              query: 'product',
            },
          ],
        },
      },
    },
  });
  const {
    loading,
    products,
    variables,
    refetch,
    current,
    pageSize,
    changePage,
  } = useGetProducts();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    getAdminProductsViewerStoreAdminProductsEdgesNodeType[]
  >([]);
  const [selectedProductTags, setSelectedProductTags] = useState<string[]>([]);
  const [selectedShipments, setSelectedShipments] = useState<
    getStoreShipmentsViewerStoreStoreShipmentsType[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const columns = useColumns(setOpenModal, setSelectedProducts);

  return (
    <Header
      title={t('title')}
      prevTitle={t('common:products')}
      backTo="/products"
      link={{
        text: t('instruction'),
        url: '',
      }}
    >
      <Table<useColumnsProductFragmentType>
        rowKey="id"
        className={styles.table}
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
                value={searchTerm}
                onChange={({ target: { value: newSearchTerm } }) =>
                  setSearchTerm(newSearchTerm)
                }
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
                    children: (
                      <Popover
                        visible
                        placement="bottomLeft"
                        trigger="click"
                        overlayClassName={styles.popover}
                        align={{ offset: [-16, 0] }}
                        content={
                          <FilterProductTag
                            productTags={filter(
                              filterProductTagFragment,
                              data?.getTagList?.data?.[0] || null,
                            )}
                            selectedProductTags={selectedProductTags}
                            setSelectedProductTags={setSelectedProductTags}
                            variables={variables}
                            refetch={refetch}
                          />
                        }
                      />
                    ),
                  },
                  {
                    text: t('product.applicable-shipments'),
                    value: 'applicableShipments',
                    children: (
                      <Popover
                        visible
                        placement="bottomLeft"
                        trigger="click"
                        overlayClassName={styles.popover}
                        align={{ offset: [-16, 0] }}
                        content={
                          <FilterShipment
                            shipments={filter(
                              filterShipmentFragment,
                              data?.viewer?.store?.storeShipments || [],
                            )}
                            selectedShipments={selectedShipments}
                            setSelectedShipments={setSelectedShipments}
                            variables={variables}
                            refetch={refetch}
                          />
                        }
                      />
                    ),
                  },
                ]}
              />

              <div
                className={styles.reset}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedShipments([]);
                  setSelectedProductTags([]);

                  refetch({ filter: null });
                }}
              >
                {t('reset')}
              </div>
            </div>

            {selectedProducts.length === 0 ? null : (
              <Button type="primary" onClick={() => setOpenModal(true)}>
                {t('change-applicable-shipments')}
              </Button>
            )}
          </div>

          <div className={styles.tagsWrap}>
            {selectedProductTags.map(tag => (
              <Tag
                key={tag}
                icon={<TagFilled />}
                className={`${styles.tag} ${styles.productTag}`}
                closable
                onClose={() => {
                  const selectedTags = [
                    ...selectedProductTags.filter(selected => selected !== tag),
                  ];

                  setSelectedProductTags(selectedTags);

                  refetch({
                    filter: {
                      ...variables?.filter,
                      tags: selectedTags,
                    },
                  });
                }}
              >
                {tag}
              </Tag>
            ))}

            {selectedShipments.map(shipment => (
              <Tag
                key={shipment.id}
                icon={<ShippingTruckFilledIcon className={styles.truck} />}
                className={`${styles.tag} ${styles.shipmentTag}`}
                closable
                onClose={() => {
                  const newSelectedShipments = [
                    ...selectedShipments.filter(
                      selected => selected.id !== shipment.id,
                    ),
                  ];
                  setSelectedShipments(newSelectedShipments);

                  refetch({
                    filter: {
                      ...variables?.filter,
                      applicableShipments: newSelectedShipments
                        .filter(
                          selected =>
                            selected.id &&
                            selected.id !== 'noApplicableShipments',
                        )
                        .map(selected => selected.id) as string[],
                      noApplicableShipments: newSelectedShipments.some(
                        select => select.id === 'noApplicableShipments',
                      ),
                    },
                  });
                }}
              >
                {getLanguage(shipment.title)}
              </Tag>
            ))}
          </div>
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
          storeId={data?.viewer?.store?.id || null}
          products={filter(
            applicableShipmentsModalAdminProductsConnectionFragment,
            products || null,
          )}
        />
      )}
    </Header>
  );
});

ProductsDesignatedShipments.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default ProductsDesignatedShipments;
