// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Table } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import useProductsColumns from './hooks/useProductsColumns';
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
interface PropsType {
  viewer: productsUserFragmentType | null;
  products: productsLineItemFragmentType[];
  hasError: boolean;
}

// definition
export default React.memo(({ viewer, products, hasError }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { columns, styles: columnStyles } = useProductsColumns(
    filter(useProductsColumnsUserFragment, viewer),
    hasError,
  );

  return (
    <>
      <Table<useProductsColumnsLineItemFragmentType>
        className={styles.root}
        columns={columns}
        dataSource={filter(useProductsColumnsLineItemFragment, products)}
        pagination={false}
        onRow={({ status }) => ({
          className: `${styles.row} ${
            status === 'PURCHASABLE' ? '' : styles.error
          }`,
          style:
            hasError && status !== 'PURCHASABLE'
              ? {
                  backgroundColor: transformColor(colors[1])
                    .alpha(0.15)
                    .toString(),
                }
              : {},
        })}
        rowKey="id"
      />

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

            ${columnStyles}
          `,
        }}
      />
    </>
  );
});
