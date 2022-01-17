// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import { useMemo } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { usePickingColumnsFragment as usePickingColumnsFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (): ColumnProps<usePickingColumnsFragmentType>[] => {
  const { t } = useTranslation('order-print');
  const getLanguage = useGetLanguage();

  return useMemo(
    () => [
      {
        title: t('serial-number'),
        width: '50px',
        render: (_, __, index: number) => index + 1,
      },
      {
        title: t('vendor-sku'),
        dataIndex: ['vendorSku'],
      },
      {
        title: t('order-product-sku'),
        dataIndex: ['sku'],
      },
      {
        title: t('title'),
        dataIndex: ['title'],
        render: (title: usePickingColumnsFragmentType['title']) =>
          getLanguage(title),
      },
      {
        title: t('warehouse-number'),
        dataIndex: ['warehouseNumber'],
      },
      {
        title: t('order-product-specs'),
        dataIndex: ['specs'],
        render: (specs: usePickingColumnsFragmentType['specs']) =>
          specs?.map(spec => getLanguage(spec?.title)).join('/'),
      },
      {
        title: t('quantity'),
        dataIndex: ['quantity'],
        align: 'right',
      },
    ],
    [getLanguage, t],
  );
};
