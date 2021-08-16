// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import { useMemo, useContext } from 'react';
import { format, subSeconds } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useColumnsUserPointsFragment } from '@meepshop/types/gqls/store';

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
        dataIndex: 'startAt',
        render: (value: useColumnsUserPointsFragment['startAt']) =>
          !value ? '-' : format(new Date(value), 'yyyy/MM/dd HH:mm'),
      },
      {
        title: t('end-time'),
        dataIndex: 'endAt',
        render: (value: useColumnsUserPointsFragment['endAt']) =>
          !value
            ? '-'
            : format(subSeconds(new Date(value), 1), 'yyyy/MM/dd HH:mm'),
      },
    ],
    [t, c],
  );
};
