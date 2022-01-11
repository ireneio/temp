// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { usePackingColumnsFragment as usePackingColumnsFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (): ColumnProps<usePackingColumnsFragmentType>[] => {
  const { t } = useTranslation('order-print');
  const getLanguage = useGetLanguage();

  return useMemo(
    () => [
      {
        title: t('order-product-sku'),
        dataIndex: ['sku'],
        render: (sku: usePackingColumnsFragmentType['sku']) => sku,
      },
      {
        title: t('order-product-title'),
        dataIndex: ['title'],
        render: (title: usePackingColumnsFragmentType['title']) =>
          getLanguage(title),
      },
      {
        title: t('order-product-specs'),
        dataIndex: ['specs'],
        render: (specs: usePackingColumnsFragmentType['specs']) => {
          return !specs ? null : (
            <div>{specs.map(spec => getLanguage(spec?.title)).join('/')}</div>
          );
        },
      },
      {
        title: t('order-product-quantity'),
        dataIndex: ['quantity'],
        align: 'right',
        render: (quantity: usePackingColumnsFragmentType['quantity']) =>
          quantity,
      },
      {
        title: t('per-amount'),
        dataIndex: ['retailPrice'],
        align: 'right',
        render: (
          retailPrice: usePackingColumnsFragmentType['retailPrice'],
          { type }: usePackingColumnsFragmentType,
        ) => (type === 'product' ? retailPrice : null),
      },
      {
        title: t('order-product-totalPrice'),
        dataIndex: ['totalPrice'],
        align: 'right',
        render: (
          totalPrice: usePackingColumnsFragmentType['totalPrice'],
          { type }: usePackingColumnsFragmentType,
        ) => (type !== 'product' ? t('gift') : totalPrice || 0),
      },
    ],
    [getLanguage, t],
  );
};
