// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { filter } from 'graphql-anywhere';
import { format } from 'date-fns';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { ChartIcon } from '@meepshop/icons';

import Tag from '../Tag';
import styles from '../styles/useProgramsColumns.less';

// graphql typescript
import { useProgramsColumnsFragment as useProgramsColumnsFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { tagFragment } from '../gqls/tag';

// definition
export default (): ColumnProps<useProgramsColumnsFragmentType>[] => {
  const { t } = useTranslation('affiliate-programs');
  const router = useRouter();

  return useMemo(
    () => [
      {
        dataIndex: ['node', 'title'],
        title: t('program-title'),
        width: '35%',
        onCell: ({ node: { id } }) => ({
          onClick: () => router.push(`/affiliate/programs/${id}`),
        }),
      },
      {
        dataIndex: ['node', 'affiliatePartner', 'name'],
        title: t('partner-name'),
        width: '17%',
        onCell: ({ node: { id } }) => ({
          onClick: () => router.push(`/affiliate/programs/${id}`),
        }),
      },
      {
        dataIndex: ['node', 'commissionRate'],
        title: t('commission-rate'),
        width: '10%',
        align: 'center',
        onCell: ({ node: { id } }) => ({
          onClick: () => router.push(`/affiliate/programs/${id}`),
        }),
        render: value => `${value}%`,
      },
      {
        dataIndex: ['node', 'startAt'],
        title: t('date'),
        width: 350,
        onCell: ({ node: { id } }) => ({
          onClick: () => router.push(`/affiliate/programs/${id}`),
        }),
        render: (value, { node }) => (
          <>
            {format(new Date(value), 'yyyy/MM/dd HH:mm')} ~{' '}
            {!node.endAt
              ? t('never-end')
              : format(new Date(node.endAt), 'yyyy/MM/dd HH:mm')}
            <Tag node={filter(tagFragment, node)} />
          </>
        ),
      },
      {
        dataIndex: ['node', 'id'],
        width: 66,
        onCell: ({ node: { id } }) => ({
          onClick: () => router.push(`/affiliate/programs/${id}/statistics`),
        }),
        render: () => (
          <Tooltip
            align={{ offset: [0, 0] }}
            title={t('effectiveness')}
            mouseEnterDelay={0.3}
          >
            <ChartIcon className={styles.icon} />
          </Tooltip>
        ),
      },
    ],
    [t, router],
  );
};
