// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

import { ColorsType } from '@meepshop/context';

// import
import React from 'react';
import { Table } from 'antd';
import transformColor from 'color';

import Reason from './Reason';
import useColumns from './hooks/useColumns';
import styles from './styles/products.less';

// graphql typescript
import { useColumnsProductsObjectTypeMemberOrderApplyFragment as useColumnsProductsObjectTypeMemberOrderApplyFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType extends FormComponentProps {
  forwardedRef: React.Ref<HTMLDivElement>;
  availableProductsForApply: useColumnsProductsObjectTypeMemberOrderApplyFragmentType[];
  checking: boolean;
  value?: string[];
  onChange?: (ids: string[] | number[]) => void;
}

// definition
const Products = React.memo(
  ({
    value,
    availableProductsForApply,
    checking,
    onChange,
    form,
  }: PropsType) => {
    const { getFieldDecorator } = form;
    const columns = useColumns(form, checking);

    return (
      <Table<useColumnsProductsObjectTypeMemberOrderApplyFragmentType>
        className={`${styles.root} ${checking ? styles.checking : ''}`}
        columns={columns}
        dataSource={availableProductsForApply.filter(product =>
          !checking
            ? product?.availableQuantity !== 0
            : value?.includes(product?.id || ''),
        )}
        expandedRowRender={({ id }) =>
          getFieldDecorator(`reason.${id}`)(
            <Reason key={id} checking={checking} />,
          )
        }
        rowSelection={{
          selections: true,
          onChange: selectedRowKeys => {
            if (onChange) onChange(selectedRowKeys);
          },
        }}
        pagination={false}
        rowKey="id"
        defaultExpandAllRows
      />
    );
  },
);

export const getProductsStyles = (colors: ColorsType): string => `
  .${
    styles.root
  } .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: ${transformColor(colors[4]).alpha(0.1)};
  }

  .${styles.root} .ant-table-tbody > tr.ant-table-row-selected td {
    background: ${transformColor(colors[4]).alpha(0.1)};
  }
`;

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <Products {...props} forwardedRef={ref} />
  ),
);
