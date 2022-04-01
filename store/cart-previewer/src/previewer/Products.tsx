// import
import React, { useContext } from 'react';
import { Table } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import useProductsColumns from './hooks/useProductsColumns';
import styles from './styles/products.less';

// graphql typescript
import {
  productsInPreviewerUserFragment as productsInPreviewerUserFragmentType,
  productsInPreviewerLineItemFragment as productsInPreviewerLineItemFragmentType,
  useProductsColumnsInPreviewerLineItemFragment as useProductsColumnsInPreviewerLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  useProductsColumnsInPreviewerUserFragment,
  useProductsColumnsInPreviewerLineItemFragment,
} from './gqls/useProductsColumns';

// typescript definition
interface PropsType {
  viewer: productsInPreviewerUserFragmentType | null;
  products: productsInPreviewerLineItemFragmentType[];
}

// definition
export default React.memo(({ viewer, products }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { columns, styles: columnStyles } = useProductsColumns(
    filter(useProductsColumnsInPreviewerUserFragment, viewer),
  );

  return (
    <>
      <Table<useProductsColumnsInPreviewerLineItemFragmentType>
        className={styles.root}
        columns={columns}
        dataSource={filter(
          useProductsColumnsInPreviewerLineItemFragment,
          products,
        )}
        showHeader={false}
        pagination={false}
        rowKey="id"
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
