// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import { useCallback } from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  useEcfitColumnsFragment_edges as useEcfitColumnsFragmentEdgesType,
  useEcfitColumnsFragment_edges_node_lastEcfitRequestRecord as useEcfitColumnsFragmentEdgesNodeLastEcfitRequestRecordType,
  getEcfitListVariables,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  variables: getEcfitListVariables,
): ((
  columns: ColumnProps<useEcfitColumnsFragmentEdgesType>[],
) => ColumnProps<useEcfitColumnsFragmentEdgesType>[]) => {
  const { t } = useTranslation('orders-ecfit');

  return useCallback(
    columns => [
      ...columns,
      ...(variables?.filter?.ecfitSentStatus !== 'SENT_SUCCESSFUL'
        ? []
        : [
            {
              title: t('orders.send-time'),
              dataIndex: ['node', 'lastEcfitRequestRecord', 'createdAt'],
              render: (
                value: useEcfitColumnsFragmentEdgesNodeLastEcfitRequestRecordType['createdAt'],
              ) =>
                !value ? null : format(new Date(value), 'yyyy/MM/dd HH:mm:ss'),
            },
          ]),
      ...(variables?.filter?.ecfitSentStatus !== 'SENT_FAILED'
        ? []
        : [
            {
              title: t('orders.fail-reason'),
              dataIndex: ['node', 'lastEcfitRequestRecord', 'response'],
              render: (
                value: useEcfitColumnsFragmentEdgesNodeLastEcfitRequestRecordType['response'],
              ) => (!value ? null : t(`fail-reason.${value}`)),
            },
          ]),
    ],
    [t, variables],
  );
};
