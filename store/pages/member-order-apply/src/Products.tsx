// import
import React, { useMemo } from 'react';
import { Table } from 'antd';

import Reason from './Reason';
import useColumns from './hooks/useColumns';
import styles from './styles/products.less';

// graphql typescript
import { useColumnsProductsObjectTypeMemberOrderApplyFragment as useColumnsProductsObjectTypeMemberOrderApplyFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  forwardedRef: React.Ref<HTMLDivElement>;
  availableProductsForApply: useColumnsProductsObjectTypeMemberOrderApplyFragmentType[];
  checking: boolean;
  value?: string[];
  onChange?: (ids: string[] | number[]) => void;
}

// definition
const Products = React.memo(
  ({ availableProductsForApply, checking, value, onChange }: PropsType) => {
    const columns = useColumns(checking);
    const dataSource = useMemo(
      () =>
        availableProductsForApply.filter(product =>
          !checking
            ? product?.availableQuantity !== 0
            : value?.includes(product?.id || ''),
        ),
      [availableProductsForApply, checking, value],
    );

    return (
      <Table<useColumnsProductsObjectTypeMemberOrderApplyFragmentType>
        className={`${styles.root} ${checking ? styles.checking : ''}`}
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={({ id }) => (
          <Reason
            key={id}
            id={id || 'null id' /** SHOULD_NOT_BE_NULL */}
            checking={checking}
          />
        )}
        rowSelection={{
          selections: true,
          onChange,
        }}
        pagination={false}
        rowKey="id"
        defaultExpandAllRows
      />
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <Products {...props} forwardedRef={ref} />
  ),
);
