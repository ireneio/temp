// typescript import
import { ColumnProps } from 'antd/lib/table';

import { ComponentProps } from '../constants';

// import
import React, { useMemo, useCallback } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { CloseOutlined } from '@ant-design/icons';

import { DragIcon } from '@meepshop/icons';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Thumbnail from '@admin/thumbnail';

import styles from '../styles/useProductsColumns.less';
import { format } from '../utils';

// graphql typescript
import {
  useProductsColumnsFragment as useProductsColumnsFragmentType,
  useProductsColumnsFragment_variants as useProductsColumnsFragmentVariantsType,
} from '@meepshop/types/gqls/admin';

// definition
const DragHandle = SortableHandle(() => <DragIcon />);

export default ({
  step,
  selected,
  setSelected,
  searchDisabled,
}: {
  step: ComponentProps['step'];
  selected: useProductsColumnsFragmentType[];
  setSelected: (products: useProductsColumnsFragmentType[]) => void;
  searchDisabled: boolean;
}): ColumnProps<useProductsColumnsFragmentType>[] => {
  const { t } = useTranslation('products-selector');
  const getLanguage = useGetLanguage();
  const remove = useCallback(
    id => setSelected(selected.filter(product => product.id !== id)),
    [selected, setSelected],
  );

  return useMemo(() => {
    if (step !== 'search')
      return [
        ...(step === 'overview'
          ? []
          : [
              {
                dataIndex: ['drag'],
                width: 36,
                className: styles.drag,
                render: () => <DragHandle />,
              },
            ]),
        {
          dataIndex: ['index'],
          title: step === 'overview' ? null : t('index'),
          width: 36,
          align: 'center',
          className: styles.index,
          render: (_, __, index) => index + 1,
        },
        {
          dataIndex: ['coverImage'],
          width: 36,
          className: styles.sort,
          render: (
            coverImage: useProductsColumnsFragmentType['coverImage'],
          ) => {
            return (
              <Thumbnail
                image={coverImage}
                className={styles.thumbnail}
                size={40}
              />
            );
          },
        },
        {
          dataIndex: ['title'],
          title: t('product-title'),
          width: '100%',
          render: (title, row) => ({
            children: <div className={styles.title}>{getLanguage(title)}</div>,
            props: {
              colSpan: row.status ? 2 : 1,
              className: row.status
                ? `${styles.colTitle} ${styles.statusless}`
                : styles.colTitle,
            },
          }),
        },
        {
          dataIndex: ['status'],
          width: 69,
          className: styles.off,
          render: (status: useProductsColumnsFragmentType['status']) => ({
            children: <span className={styles.status}>{t('off')}</span>,
            props: {
              colSpan: status ? 0 : 1,
            },
          }),
        },
        ...(step === 'overview'
          ? []
          : [
              {
                dataIndex: ['variants', '0', 'stock'],
                title: t('stock'),
                width: 54,
                align: 'center' as const,
                className: styles.number,
                render: (
                  value: useProductsColumnsFragmentVariantsType['stock'],
                ) => (!value ? t('no-stock') : format(value)),
              },
            ]),
        ...(step === 'sort'
          ? []
          : [
              {
                dataIndex: ['variants', '0', 'sku'],
                title: t('sku'),
                minWidth: 54,
                align: 'left' as const,
                className: styles.productId,
                render: (
                  value: useProductsColumnsFragmentVariantsType['sku'],
                ) => value || '',
              },
            ]),
        {
          dataIndex: ['variants', '0', 'retailPrice'],
          title: t('price'),
          width: 54,
          align: 'center',
          className: styles.number,
          render: value => `$${format(value)}`,
        },
        ...(searchDisabled
          ? []
          : [
              {
                dataIndex: ['id'],
                width: 43,
                className: styles.remove,
                render: (id: useProductsColumnsFragmentType['id']) => (
                  <CloseOutlined onClick={() => remove(id)} />
                ),
              },
            ]),
      ];

    return [
      {
        dataIndex: ['coverImage'],
        width: 56,
        render: (coverImage: useProductsColumnsFragmentType['coverImage']) => {
          return (
            <Thumbnail
              image={coverImage}
              className={styles.thumbnail}
              size={40}
            />
          );
        },
      },
      {
        dataIndex: ['title'],
        width: '100%',
        render: (title, row) => ({
          children: (
            <div>
              {row.status ? null : (
                <span className={styles.status}>{t('off')}</span>
              )}
              <div className={styles.title}>{getLanguage(title)}</div>
            </div>
          ),
          props: {
            colSpan: !row.variants?.[0]?.sku ? 2 : 1,
          },
        }),
      },
      {
        dataIndex: ['variants', '0', 'sku'],
        render: (sku?: string | null) => ({
          children: <div className={styles.sku}>{sku}</div>,
          props: {
            colSpan: !sku ? 0 : 1,
          },
        }),
      },
    ];
  }, [getLanguage, remove, step, searchDisabled, t]);
};
