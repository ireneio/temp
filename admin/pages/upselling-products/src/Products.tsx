// import
import React from 'react';
import { Table } from 'antd';
import { emptyFunction } from 'fbjs';

import ProductsSelector from '@admin/products-selector';
import { useTranslation } from '@meepshop/locales';

import useUpsellingProductColumns from './hooks/useUpsellingProductColumns';
import styles from './styles/products.less';

// graphql typescript
import { useUpsellingProductColumnsFragment as useUpsellingProductColumnsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  onChange?: () => void;
  value?: useUpsellingProductColumnsFragmentType[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// definition
export default React.memo(
  ({ onChange = emptyFunction, value, visible, setVisible }: PropsType) => {
    const { t } = useTranslation('upselling-products');
    const columns = useUpsellingProductColumns();
    const amount = value?.length;

    return (
      <>
        {!amount ? null : (
          <>
            <Table<useUpsellingProductColumnsFragmentType>
              className={styles.table}
              size="middle"
              dataSource={value}
              // SHOULD_NOT_BE_NULL
              rowKey={record => record.id || 'null-id'}
              columns={columns}
              pagination={false}
            />

            <div className={styles.selected}>
              <span>{amount}</span>
              <span>/10</span>
              <span>{t('chosen')}</span>
            </div>
          </>
        )}

        <ProductsSelector
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore FIXME: T9935
          products={value}
          visible={visible}
          onChange={onChange}
          onCancel={() => setVisible(false)}
        />
      </>
    );
  },
);
