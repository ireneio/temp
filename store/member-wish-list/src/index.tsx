// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon, Table } from 'antd';
import { filter } from 'graphql-anywhere';

import { Colors as ColorsContext } from '@meepshop/context';

import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import {
  getWishlist as getWishlistType,
  useColumnsWishlistProductFragment as useColumnsWishlistProductFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getWishlist } from './gqls';
import {
  useColumnsWishlistProductFragment,
  useColumnsUserFragment,
} from './gqls/useColumns';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { data } = useQuery<getWishlistType>(getWishlist);
  const columns = useColumns(
    filter(useColumnsUserFragment, data?.viewer || null),
  );
  const wishList = data?.viewer?.wishList;

  if (!wishList) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <div className={styles.root}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-table {
              color: ${colors[3]};
            }

            .${styles.root} .ant-table-thead > tr > th {
              color: ${colors[3]};
            }

            .${styles.root} .ant-table-tbody > tr:hover > td {
              background: ${colors[4]};
            }
          `,
        }}
      />

      <Table
        rowKey={({ productId }) => productId}
        columns={columns}
        dataSource={filter<useColumnsWishlistProductFragmentType[]>(
          useColumnsWishlistProductFragment,
          wishList.filter(Boolean) /** SHOULD_NOT_BE_NULL */,
        )}
        pagination={false}
      />
    </div>
  );
});
