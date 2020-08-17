// typescript import
import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context/lib/colors';
import { CurrencyType } from '@store/currency';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon, Table } from 'antd';
import memoizeOne from 'memoize-one';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { colors as colorsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import currencyContext from '@store/currency';

import styles from './styles/index.less';

// graphql typescript
import {
  getUserRewardPotins,
  getUserRewardPotins_viewer_rewardPoint as getUserRewardPotinsViewerRewardPoint,
  getUserRewardPotins_getValidUserPointList_data as getUserRewardPotinsGetValidUserPointListData,
} from './__generated__/getUserRewardPotins';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  currentBalance: getUserRewardPotinsViewerRewardPoint['currentBalance'];
  userPoints: getUserRewardPotinsGetValidUserPointListData[];
  colors: ColorsType;
}

// definition
class MemberRewardPoints extends React.PureComponent<PropsType> {
  private generateColumns = memoizeOne(
    ({ t, c }: Pick<PropsType, 't' | 'c'>) => [
      {
        title: 'NO.',
        dataIndex: 'id',
        render: (
          _: getUserRewardPotinsGetValidUserPointListData['id'],
          __: getUserRewardPotinsGetValidUserPointListData,
          index: number,
        ) => index + 1,
      },
      {
        title: t('activity-name'),
        dataIndex: 'title',
        render: (
          value: getUserRewardPotinsGetValidUserPointListData['title'],
          { activity, note }: getUserRewardPotinsGetValidUserPointListData,
        ) => {
          if (value) return value.zh_TW;
          if (note) return note;
          if (activity) return activity.zh_TW;
          return t('other');
        },
      },
      {
        title: t('points'),
        dataIndex: 'points',
        render: (
          value: getUserRewardPotinsGetValidUserPointListData['points'],
        ) => c(value || 0 /** TODO: should not be null */),
      },
      {
        title: t('start-time'),
        dataIndex: 'startTime',
        render: (
          value: getUserRewardPotinsGetValidUserPointListData['startTime'],
        ) => (!value ? '-' : moment.unix(value).format('YYYY/MM/DD HH:mm')),
      },
      {
        title: t('end-time'),
        dataIndex: 'endTime',
        render: (
          value: getUserRewardPotinsGetValidUserPointListData['endTime'],
        ) =>
          !value
            ? '-'
            : moment
                .unix(value)
                .subtract(1, 'seconds')
                .format('YYYY/MM/DD HH:mm'),
      },
    ],
  );

  private getRowClassName = ({
    points,
    endTime,
  }: getUserRewardPotinsGetValidUserPointListData): string => {
    if (
      (endTime && moment().diff(moment.unix(endTime)) > 0) ||
      (points || 0) /** TODO: should not be null */ <= 0
    )
      return styles.outdate;

    if (
      endTime &&
      moment()
        .add(1, 'months')
        .diff(moment.unix(endTime)) > 0
    )
      return styles.expireSoon;

    return '';
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      c,

      // props
      currentBalance,
      userPoints,
      colors,
    } = this.props;

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${colors[4]};
              }
            `,
          }}
        />

        <div
          className={styles.total}
          style={{ borderBottom: `3px solid ${colors[5]}` }}
        >
          {t('current-points')}
          {c(currentBalance)}
        </div>

        <Table
          rowKey="id"
          columns={this.generateColumns({ t, c })}
          rowClassName={this.getRowClassName}
          dataSource={userPoints}
          pagination={false}
        />
      </div>
    );
  }
}

const EnhancedMemberRewardPoints = withTranslation('member-reward-points')(
  withContext(currencyContext)(
    withContext(colorsContext, colors => ({ colors }))(MemberRewardPoints),
  ),
);

export default React.memo(() => (
  <Query<getUserRewardPotins>
    query={gql`
      query getUserRewardPotins {
        viewer {
          id
          rewardPoint {
            currentBalance
          }
        }

        getValidUserPointList(hasUseablePoints: true) {
          data {
            id
            title {
              zh_TW
            }
            activity {
              zh_TW
            }
            note
            points
            endTime
            startTime
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading || error || !data)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const { viewer, getValidUserPointList } = data;
      const userPoints = getValidUserPointList?.data;

      if (!viewer || !userPoints)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const currentBalance =
        viewer?.rewardPoint?.currentBalance ||
        0; /** TODO: should not be null */

      return (
        <EnhancedMemberRewardPoints
          currentBalance={currentBalance}
          userPoints={
            userPoints.filter(
              Boolean,
            ) as PropsType['userPoints'] /** TODO: should not be null */
          }
        />
      );
    }}
  </Query>
));
