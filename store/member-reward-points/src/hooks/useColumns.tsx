// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import { useMemo, useContext } from 'react';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useColumnsUserPointsFragment } from '../gqls/__generated__/useColumnsUserPointsFragment';

// definition
export default (): ColumnProps<useColumnsUserPointsFragment>[] => {
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('member-reward-points');

  return useMemo(
    () => [
      {
        title: 'NO.',
        dataIndex: 'id',
        render: (
          _: useColumnsUserPointsFragment['id'],
          __: useColumnsUserPointsFragment,
          index: number,
        ) => index + 1,
      },
      {
        title: t('activity-name'),
        dataIndex: 'title',
        render: (
          value: useColumnsUserPointsFragment['title'],
          { activity, note }: useColumnsUserPointsFragment,
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
        render: (value: useColumnsUserPointsFragment['points']) =>
          c(value || 0 /** SHOULD_NOT_BE_NULL */),
      },
      {
        title: t('start-time'),
        dataIndex: 'startTime',
        render: (value: useColumnsUserPointsFragment['startTime']) =>
          !value ? '-' : moment.unix(value).format('YYYY/MM/DD HH:mm'),
      },
      {
        title: t('end-time'),
        dataIndex: 'endTime',
        render: (value: useColumnsUserPointsFragment['endTime']) =>
          !value
            ? '-'
            : moment
                .unix(value)
                .subtract(1, 'seconds')
                .format('YYYY/MM/DD HH:mm'),
      },
    ],
    [t, c],
  );
};