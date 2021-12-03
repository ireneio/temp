// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';

import { useTranslation } from '@meepshop/locales';
import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';

import useColumns from './hooks/useColumns';
import useRowClassName from './hooks/useRowClassName';
import styles from './styles/index.less';

// graphql typescript
import {
  getUserRewardPotins as getUserRewardPotinsType,
  getUserRewardPotins_getValidUserPointList_data as getUserRewardPotinsGetValidUserPointListDataType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getUserRewardPotins } from './gqls';
import { useColumnsUserPointsFragment } from './gqls/useColumns';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const { t } = useTranslation('member-reward-points');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);

  const columns = useColumns();
  const rowClassName = useRowClassName();

  const { data } = useQuery<getUserRewardPotinsType>(getUserRewardPotins);
  const userPoints = data?.getValidUserPointList?.data;
  const currentBalance =
    data?.viewer?.rewardPoint?.currentBalance || 0; /** SHOULD_NOT_BE_NULL */

  if (!userPoints) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <div className={styles.root}>
      <div
        className={styles.total}
        style={{ borderBottom: `3px solid ${colors[5]}` }}
      >
        {t('current-points')}
        {c(currentBalance)}
      </div>

      <Table
        rowKey="id"
        columns={columns}
        rowClassName={rowClassName}
        dataSource={filter<getUserRewardPotinsGetValidUserPointListDataType[]>(
          useColumnsUserPointsFragment,
          userPoints.filter(Boolean) /** SHOULD_NOT_BE_NULL */,
        )}
        pagination={false}
      />
    </div>
  );
});
