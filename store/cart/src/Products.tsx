// import
import React, { useContext } from 'react';
import { Table } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import useProductsColumns from './hooks/useProductsColumns';
import styles from './styles/products.less';

// graphql import
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  products: useProductsColumnsFragmentType[];
  hasError: boolean;
}

// definition
export default React.memo(({ products, hasError }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { columns, styles: columnStyles } = useProductsColumns(hasError);

  return (
    <>
      <Table<useProductsColumnsFragmentType>
        className={styles.root}
        columns={columns}
        dataSource={products}
        pagination={false}
        onRow={({ error }) => ({
          className: `${styles.row} ${!error ? '' : styles.error}`,
          style:
            hasError && error
              ? {
                  backgroundColor: transformColor(colors[1])
                    .alpha(0.15)
                    .toString(),
                }
              : {},
        })}
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
