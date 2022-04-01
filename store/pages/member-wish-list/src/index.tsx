// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';

import filter from '@meepshop/utils/lib/filter';

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
  const { data } = useQuery<getWishlistType>(getWishlist);
  const columns = useColumns(
    filter(useColumnsUserFragment, data?.viewer || null),
  );
  const wishList = data?.viewer?.wishList;

  if (!wishList) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <div className={styles.root}>
      <Table
        columns={columns}
        dataSource={filter<useColumnsWishlistProductFragmentType[]>(
          useColumnsWishlistProductFragment,
          wishList.filter(Boolean) /** SHOULD_NOT_BE_NULL */,
        )}
        pagination={false}
        rowKey="productId"
      />
    </div>
  );
});
