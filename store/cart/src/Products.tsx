// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import React, { useContext, useMemo } from 'react';
import { Table, Skeleton } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

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
interface PropsType extends Pick<FormInstance, 'getFieldsError'> {
  viewer: productsUserFragmentType | null;
  products: productsLineItemFragmentType[];
}

// definition
export default React.memo(({ viewer, products, getFieldsError }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { columns, styles: columnStyles } = useProductsColumns(
    filter(useProductsColumnsUserFragment, viewer),
  );
  const error = getFieldsError();
  const hasErrors = useMemo(() => error.some(({ errors }) => errors.length), [
    error,
  ]);

  return (
    <>
      <Table<useProductsColumnsLineItemFragmentType>
        className={styles.root}
        columns={columns}
        dataSource={filter(useProductsColumnsLineItemFragment, products)}
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

            .${styles.root} .ant-table.ant-table-empty .ant-table-tbody > tr > td {
              border-bottom: 0px;
            }

            ${columnStyles}
          `,
        }}
      />
    </>
  );
});
