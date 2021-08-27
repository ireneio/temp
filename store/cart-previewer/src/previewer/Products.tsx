// import
import React, { useContext } from 'react';
import { Table } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import useProductsColumns from './hooks/useProductsColumns';
import styles from './styles/products.less';

// graphql import
import { useProductsColumnsInPreviewerFragment as useProductsColumnsInPreviewerFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  products: useProductsColumnsInPreviewerFragmentType[];
}

// definition
export default React.memo(({ products }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { columns, styles: columnStyles } = useProductsColumns();

  return (
    <>
      <Table<useProductsColumnsInPreviewerFragmentType>
        className={styles.root}
        columns={columns}
        dataSource={products}
        showHeader={false}
        pagination={false}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-table {
              color: ${colors[3]};
            }

            .${styles.root} .ant-table-tbody > tr > td {
              border-bottom: 1px solid ${transformColor(colors[5]).alpha(0.5)};
            }

            ${columnStyles}
          `,
        }}
      />
    </>
  );
});
