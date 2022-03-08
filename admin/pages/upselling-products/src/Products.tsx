// import
import React, { useState } from 'react';
import { Table } from 'antd';
import { emptyFunction } from 'fbjs';
import { PlusCircleOutlined } from '@ant-design/icons';

import ProductsSelector from '@admin/products-selector';
import { useTranslation } from '@meepshop/locales';
import { ChangeProductIcon } from '@meepshop/icons';

import useUpsellingProductColumns from './hooks/useUpsellingProductColumns';
import styles from './styles/products.less';

// graphql typescript
import { useUpsellingProductColumnsFragment as useUpsellingProductColumnsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  onChange?: () => void;
  value?: useUpsellingProductColumnsFragmentType[];
}

// definition
export default React.memo(({ onChange = emptyFunction, value }: PropsType) => {
  const { t } = useTranslation('upselling-products');
  const [visible, setVisible] = useState(false);
  const columns = useUpsellingProductColumns();
  const amount = value?.length;

  return (
    <>
      {!amount ? (
        <div className={styles.addProducts} onClick={() => setVisible(true)}>
          <PlusCircleOutlined />
          {t('products.add')}
        </div>
      ) : (
        <div className={styles.adjustProducts} onClick={() => setVisible(true)}>
          <ChangeProductIcon />
          {t('products.adjust')}
        </div>
      )}

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
        products={value}
        visible={visible}
        onChange={onChange}
        onCancel={() => setVisible(false)}
      />
    </>
  );
});
