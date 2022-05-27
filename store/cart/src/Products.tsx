// typescript import
import { FormInstance } from 'antd/lib/form';

import { ReturnType } from './hooks/useComputedCart';
import { ValuesType } from './hooks/useInitialValue';

// import
import React, { useContext } from 'react';
import { Table, Skeleton } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import { NotDeliveredOutlineIcon } from '@meepshop/icons';
import filter from '@meepshop/utils/lib/filter';

import ExpandedRow from './ExpandedRow';
import useProductsColumns from './hooks/useProductsColumns';
import useProducts from './hooks/useProducts';
import useRowSelection from './hooks/useRowSelection';
import styles from './styles/products.less';

// graphql typescript
import {
  productsUserFragment as productsUserFragmentType,
  productsLineItemFragment as productsLineItemFragmentType,
  useProductsColumnsLineItemFragment as useProductsColumnsLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  useProductsColumnsUserFragment,
  useProductsColumnsLineItemFragment,
} from './gqls/useProductsColumns';

// typescript definition
interface PropsType
  extends Pick<FormInstance, 'setFieldsValue'>,
    Pick<ReturnType, 'refetch' | 'variables'> {
  viewer: productsUserFragmentType | null;
  computedLineItems: productsLineItemFragmentType[];
  products: ValuesType['products'];
  shipmentId: ValuesType['shipmentId'];
  hasErrors: boolean;
  requireDesignatedShipment: boolean;
}

// definition
export default React.memo(
  ({
    viewer,
    computedLineItems,
    products,
    shipmentId,
    hasErrors,
    requireDesignatedShipment,
    setFieldsValue,
    refetch,
    variables,
  }: PropsType) => {
    const { t } = useTranslation('cart');
    const colors = useContext(ColorsContext);
    const { availableItems, unvailableItems } = useProducts({
      requireDesignatedShipment,
      computedLineItems,
      shipmentId,
    });
    const { columns, styles: columnStyles } = useProductsColumns({
      viewer: filter(useProductsColumnsUserFragment, viewer),
      requireDesignatedShipment,
    });
    const rowSelection = useRowSelection({
      requireDesignatedShipment,
      products,
      setFieldsValue,
      refetch,
      variables,
    });
    const hasUnvailableItems =
      requireDesignatedShipment && unvailableItems.length;

    return (
      <>
        <div className={styles.title}>{t('products')}</div>

        <Table<useProductsColumnsLineItemFragmentType>
          className={styles.root}
          columns={columns}
          dataSource={filter(
            useProductsColumnsLineItemFragment,
            availableItems,
          )}
          pagination={false}
          onRow={({ status }) => ({
            className: `${styles.row} ${
              status !== 'PURCHASABLE' ? styles.error : ''
            }`,
            style:
              hasErrors && status !== 'PURCHASABLE'
                ? {
                    backgroundColor: transformColor(colors[1])
                      .alpha(0.15)
                      .toString(),
                  }
                : {},
          })}
          locale={{
            emptyText: [1, 2].map(key => (
              <Skeleton
                key={key}
                avatar={{
                  shape: 'square',
                  size: 105,
                }}
                paragraph={{
                  rows: 2,
                }}
                active
              />
            )),
          }}
          rowKey={record => `${record.type}-${record.variantId}`}
          rowSelection={rowSelection}
        />

        {!hasUnvailableItems ? null : (
          <>
            <div className={styles.tip}>
              <NotDeliveredOutlineIcon />
              <div>{t('unvailable')}</div>
            </div>

            <Table<useProductsColumnsLineItemFragmentType>
              className={`${styles.root} ${styles.unvailable}`}
              columns={columns}
              dataSource={filter(
                useProductsColumnsLineItemFragment,
                unvailableItems,
              )}
              pagination={false}
              rowClassName={styles.row}
              rowKey={record => `${record.type}-${record.variantId}`}
              expandable={{
                columnWidth: 0,
                defaultExpandAllRows: true,
                rowExpandable: () => true,
                expandedRowRender: record => <ExpandedRow record={record} />,
              }}
            />
          </>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.root} .ant-table {
              color: ${colors[3]};
            }

            .${styles.root} .ant-table-thead > tr > th,
            .${styles.root} .ant-table-tbody > tr > td {
              border-bottom: 1px solid ${colors[5]};
            }

            ${
              !hasUnvailableItems
                ? ''
                : `
              .${styles.root} .ant-table-tbody > tr:last-child > td {
                border-bottom: none;
              }
            `
            }

            .${
              styles.root
            } .ant-table.ant-table-empty .ant-table-tbody > tr > td {
              border-bottom: 0px;
            }

            .${styles.root} .ant-checkbox-inner {
              background-color: transparent;
              border-color: ${transformColor(colors[3]).alpha(0.3)};
            }

            .${styles.root} .ant-checkbox-wrapper:hover .ant-checkbox-inner,
            .${styles.root} .ant-checkbox-input:focus + .ant-checkbox-inner,
            .${styles.root} .ant-checkbox-checked:after {
              border-color: ${colors[3]};
            }

            .${styles.root} .ant-checkbox-checked .ant-checkbox-inner {
              border-color: ${colors[3]};
              background-color: ${colors[3]};
            }

            .${styles.root} .ant-checkbox-checked .ant-checkbox-inner::after {
              border-color: ${colors[0]};
            }

            ${columnStyles}
          `,
          }}
        />
      </>
    );
  },
);
