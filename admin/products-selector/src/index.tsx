// typescript import
import {
  SortableContainerProps,
  SortableElementProps,
} from 'react-sortable-hoc';

import { ComponentProps } from './constants';

// import
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Modal, Table, Spin, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { emptyFunction } from 'fbjs';

import { productsEmpty } from '@meepshop/images';
import { useTranslation } from '@meepshop/locales';

import Header from './Header';
import Footer from './Footer';
import SortableWrapper from './SortableWrapper';
import SortableRow from './SortableRow';
import useProductsColumns from './hooks/useProductsColumns';
import useChangeProductsPage from './hooks/useChangeProductsPage';
import useSortEnd from './hooks/useSortEnd';
import useRowSelection from './hooks/useRowSelection';
import { pageSize } from './constants';
import styles from './styles/index.less';

// graphql typescript
import {
  getProducts as getProductsType,
  getProductsVariables as getProductsVariablesType,
  useProductsColumnsFragment as useProductsColumnsFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getProducts } from './gqls';
import { headerFragment } from './gqls/header';
import { useChangeProductsPageFragment } from './gqls/useChangeProductsPage';
import { useProductsColumnsFragment } from './gqls/useProductsColumns';

// typescript definition
interface PropsType {
  visible: boolean;
  products?: useProductsColumnsFragmentType[];
  onCancel?: () => void;
  onChange?: (products: useProductsColumnsFragmentType[]) => void;
}

// definition
export default React.memo(
  ({
    visible,
    products,
    onChange = emptyFunction,
    onCancel = emptyFunction,
  }: PropsType) => {
    const { t } = useTranslation('products-selector');
    const [step, setStep] = useState<ComponentProps['step']>('search');
    const [selected, setSelected] = useState<useProductsColumnsFragmentType[]>(
      products || [],
    );
    const { data, variables, fetchMore, refetch, loading } = useQuery<
      getProductsType,
      getProductsVariablesType
    >(getProducts, {
      variables: {
        first: pageSize,
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
      ssr: false,
      notifyOnNetworkStatusChange: true,
    });
    const columns = useProductsColumns({ step, selected, setSelected });
    const changeProductsPage = useChangeProductsPage({
      products: filter(
        useChangeProductsPageFragment,
        data?.viewer?.store?.adminProducts || null,
      ),
      fetchMore,
    });
    const sortEnd = useSortEnd({ selected, setSelected });
    const rowSelection = useRowSelection({ selected, setSelected });
    const adminProducts = data?.viewer?.store?.adminProducts;

    useEffect(() => {
      setStep(!products?.length ? 'search' : 'sort');
    }, [visible, products]);

    if (!adminProducts) return <Spin indicator={<LoadingOutlined spin />} />;

    const {
      edges,
      total,
      pageInfo: {
        currentInfo: { current },
      },
    } = adminProducts;

    return (
      <Modal
        className={styles.root}
        visible={visible}
        title={null}
        footer={null}
        width={736}
        centered
        onCancel={onCancel}
      >
        <Header
          variables={variables}
          refetch={refetch}
          // SHOULD_NOT_BE_NULL
          productTags={filter(
            headerFragment,
            data?.getTagList?.data?.[0] || null,
          )}
          step={step}
        />

        <Table<useProductsColumnsFragmentType>
          className={`${styles.table} ${styles[step]}`}
          dataSource={
            step === 'search'
              ? filter<useProductsColumnsFragmentType[]>(
                  useProductsColumnsFragment,
                  edges
                    .slice(current * pageSize, (current + 1) * pageSize)
                    .map(edge => edge?.node),
                )
              : selected
          }
          rowKey={record => record.id || 'null-id'}
          loading={loading}
          columns={columns}
          pagination={false}
          rowSelection={step === 'sort' ? undefined : rowSelection}
          components={
            step !== 'sort'
              ? undefined
              : {
                  body: {
                    wrapper: (props: SortableContainerProps) => (
                      <SortableWrapper
                        {...props}
                        useDragHandle
                        helperClass={styles.dragging}
                        onSortEnd={sortEnd}
                      />
                    ),
                    row: (
                      props: { 'data-row-key': string } & SortableElementProps,
                    ) => {
                      const index = selected.findIndex(
                        product => product.id === props['data-row-key'],
                      );

                      return <SortableRow {...props} index={index} />;
                    },
                  },
                }
          }
          locale={{
            emptyText: (
              <Empty
                image={<img src={productsEmpty} alt="empty" />}
                description={t(`empty.${step}`)}
              />
            ),
          }}
        />

        <Footer
          selectedLength={selected.length}
          current={current}
          total={total}
          changeProductsPage={changeProductsPage}
          setStep={setStep}
          step={step}
          confirm={() => {
            onChange(selected);
            onCancel();
          }}
          clear={() => setSelected([])}
        />
      </Modal>
    );
  },
);
