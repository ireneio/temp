// typescript import
import { ColumnProps } from 'antd/lib/table';

import { ComponentProps } from '../constants';

// import
import React, { useMemo, useCallback } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { CloseOutlined } from '@ant-design/icons';

import { DragIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import Thumbnail from '@meepshop/thumbnail';

import styles from '../styles/useProductsColumns.less';
import { format } from '../utils';

// graphql typescript
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/admin';

// definition
const DragHandle = SortableHandle(() => <DragIcon />);

export default ({
  step,
  selected,
  setSelected,
}: {
  step: ComponentProps['step'];
  selected: useProductsColumnsFragmentType[];
  setSelected: (products: useProductsColumnsFragmentType[]) => void;
}): ColumnProps<useProductsColumnsFragmentType>[] => {
  const { t } = useTranslation('products-selector');
  const remove = useCallback(
    id => setSelected(selected.filter(product => product.id !== id)),
    [selected, setSelected],
  );

  return useMemo(() => {
    if (step === 'sort')
      return [
        {
          dataIndex: ['drag'],
          width: 36,
          className: styles.drag,
          render: () => <DragHandle />,
        },
        {
          dataIndex: ['index'],
          title: t('index'),
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
              <Thumbnail image={coverImage} className={styles.thumbnail} />
            );
          },
        },
        {
          dataIndex: ['title', 'zh_TW'],
          title: t('product-title'),
          width: '100%',
          render: (title, row) => ({
            children: <div className={styles.title}>{title}</div>,
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
        {
          dataIndex: ['variants', '0', 'stock'],
          title: t('stock'),
          width: 54,
          align: 'center',
          className: styles.number,
          render: value => (!value ? t('no-stock') : format(value)),
        },
        {
          dataIndex: ['variants', '0', 'retailPrice'],
          title: t('price'),
          width: 54,
          align: 'center',
          className: styles.number,
          render: value => `$${format(value)}`,
        },
        {
          dataIndex: ['id'],
          width: 43,
          className: styles.remove,
          render: id => <CloseOutlined onClick={() => remove(id)} />,
        },
      ];

    return [
      {
        dataIndex: ['coverImage'],
        width: 56,
        render: (coverImage: useProductsColumnsFragmentType['coverImage']) => {
          return <Thumbnail image={coverImage} className={styles.thumbnail} />;
        },
      },
      {
        dataIndex: ['title', 'zh_TW'],
        width: '100%',
        render: (title, row) => ({
          children: (
            <div>
              {row.status ? null : (
                <span className={styles.status}>{t('off')}</span>
              )}
              <div className={styles.title}>{title}</div>
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
  }, [remove, step, t]);
};
