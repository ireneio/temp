// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon, Table } from 'antd';
import { emptyFunction } from 'fbjs';
import transformColor from 'color';
import { filter } from 'graphql-anywhere';

import { Colors as ColorsContext } from '@meepshop/context';

import { getMobileStyles } from './MobileColumn';
import styles from './styles/index.less';
import useColumns from './hooks/useColumns';
import useChangePage from './hooks/useChangePage';

// graphql typescript
import {
  getOrders as getOrdersType,
  getOrdersVariables as getOrdersVariablesType,
} from './gqls/__generated__/getOrders';
import { useColumnsOrdersFragment as useColumnsOrdersFragmentType } from './gqls/__generated__/useColumnsOrdersFragment';

// graphql import
import { getOrders } from './gqls';
import { useColumnsOrdersFragment } from './gqls/useColumns';
import { changePageFragment } from './gqls/useChangePage';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const columns = useColumns();

  const { data, variables, fetchMore } = useQuery<
    getOrdersType,
    getOrdersVariablesType
  >(getOrders, {
    variables: { first: 10 },
  });
  const { first } = variables;
  const orders = data?.viewer?.orders || null;

  const { changePage, loading } = useChangePage(
    filter(changePageFragment, orders),
    fetchMore,
    first,
  );

  if (!orders) return <Spin indicator={<Icon type="loading" spin />} />;

  const {
    total,
    edges,
    pageInfo: {
      currentInfo: { current },
    },
  } = orders;

  const endPage = Math.ceil(total / first);

  return (
    <div className={styles.root}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-table,
            .${styles.root} .ant-table-thead > tr > th {
              color: ${colors[3]};
            }

            .${styles.root} .ant-table-tbody > tr:hover > td {
              background: ${transformColor(colors[4]).alpha(0.1)};
            }

            .${styles.disabled} {
              color: ${transformColor(colors[3]).alpha(0.3)};
            }

            ${getMobileStyles(colors)}
          `,
        }}
      />
      <Table
        dataSource={filter<useColumnsOrdersFragmentType[]>(
          useColumnsOrdersFragment,
          [...edges].slice(current * first, (current + 1) * first),
        )}
        columns={columns}
        loading={loading}
        rowKey={({ node: { id } }) => id || 'null-id' /** SHOULD_NOT_BE_NULL */}
        pagination={false}
      />
      {endPage === 1 ? null : (
        <div className={styles.pagination}>
          <Icon
            type="left"
            className={current === 0 ? styles.disabled : ''}
            onClick={
              current === 0 ? emptyFunction : () => changePage(current - 1)
            }
          />
          {current + 1} / {endPage}
          <Icon
            type="right"
            className={current === endPage - 1 ? styles.disabled : ''}
            onClick={
              current === endPage - 1
                ? emptyFunction
                : () => changePage(current + 1)
            }
          />
        </div>
      )}
    </div>
  );
});
