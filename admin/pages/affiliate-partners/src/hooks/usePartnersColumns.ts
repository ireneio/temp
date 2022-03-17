// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import { useMemo } from 'react';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { usePartnersColumnsFragment as usePartnersColumnsFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (): ColumnProps<usePartnersColumnsFragmentType>[] => {
  const { t } = useTranslation('affiliate-partners');

  return useMemo(
    () => [
      {
        dataIndex: ['node', 'name'],
        title: t('name'),
        width: '40%',
      },
      {
        dataIndex: ['node', 'email'],
        title: t('email'),
        width: '25%',
      },
      {
        dataIndex: ['node', 'createdAt'],
        title: t('createdAt'),
        render: (value: usePartnersColumnsFragmentType['node']['createdAt']) =>
          format(new Date(value), 'yyyy/MM/dd HH:mm'),
      },
    ],
    [t],
  );
};
