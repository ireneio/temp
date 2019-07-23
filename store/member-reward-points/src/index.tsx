// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';
import { CurrencyType } from '@store/currency';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Spin, Icon, Table } from 'antd';
import idx from 'idx';
import memoizeOne from 'memoize-one';
import moment from 'moment';

import { withNamespaces } from '@store/utils/lib/i18n';
import withCurrency from '@store/currency';

import styles from './styles/index.less';

// graphql typescript
import {
  getUserRewardPotins,
  getUserRewardPotins_viewer_rewardPoint as getUserRewardPotinsViewerRewardPoint,
  getUserRewardPotins_getValidUserPointList_data as getUserRewardPotinsGetValidUserPointListData,
} from './__generated__/getUserRewardPotins';

// graphql import
import { colorsFragment } from '@store/apollo-client-resolvers/lib/ColorList';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  currentBalance: getUserRewardPotinsViewerRewardPoint['currentBalance'];
  userPoints: getUserRewardPotinsGetValidUserPointListData[];
  colors: string[];
}

// definition
class MemberRewardPoints extends React.PureComponent<PropsType> {
  private generateColumns = memoizeOne(
    ({ t, c }: Pick<PropsType, 't' | 'i18n' | 'c'>) => [
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
        ) => (!value ? '-' : moment.unix(value).format('YYYY/MM/DD')),
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
                .format('YYYY/MM/DD'),
      },
    ],
  );

  private getRowClassName = ({
    points,
    endTime,
  }: getUserRewardPotinsGetValidUserPointListData) => {
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
      i18n,
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

              .${styles.total} {
                border-bottom: 3px solid ${colors[5]};
              }
            `,
          }}
        />

        <div className={styles.total}>
          {t('current-points')}
          {c(currentBalance)}
        </div>

        <Table
          rowKey="id"
          columns={this.generateColumns({ t, i18n, c })}
          rowClassName={this.getRowClassName}
          dataSource={userPoints}
          pagination={false}
        />
      </div>
    );
  }
}

const EnhancedMemberRewardPoints = withNamespaces('member-reward-points')(
  withCurrency(MemberRewardPoints),
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

        getColorList {
          ...colorsFragment
        }
      }

      ${colorsFragment}
    `}
    fetchPolicy="no-cache"
  >
    {({ loading, error, data }) => {
      if (loading || error || !data)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const { viewer, getValidUserPointList, getColorList } = data;
      const currentBalance = idx(viewer, _ => _.rewardPoint.currentBalance);
      const userPoints = idx(getValidUserPointList, _ => _.data);

      if (!currentBalance || !userPoints || !getColorList)
        return <Spin indicator={<Icon type="loading" spin />} />;

      return (
        <EnhancedMemberRewardPoints
          currentBalance={currentBalance}
          userPoints={userPoints}
          colors={getColorList.colors}
        />
      );
    }}
  </Query>
));
