// typescript import
import { TableRowSelection } from 'antd/lib/table/interface';

// import
import { useMemo } from 'react';

// graphql typescript
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  selected: useProductsColumnsFragmentType[];
  setSelected: (products: useProductsColumnsFragmentType[]) => void;
}

// definition
export default ({
  selected,
  setSelected,
}: PropsType): TableRowSelection<useProductsColumnsFragmentType> =>
  useMemo(
    () => ({
      type: 'checkbox',
      columnWidth: '40px',
      preserveSelectedRowKeys: true,
      selectedRowKeys: selected.map(product => product.id as string),
      onSelect: (record, select) =>
        select
          ? setSelected([record, ...selected])
          : setSelected(selected.filter(product => product.id !== record.id)),
      onSelectAll: (select, _, changeRows) =>
        select
          ? setSelected([...changeRows, ...selected])
          : setSelected(
              selected.filter(
                product => !changeRows.some(row => row.id === product.id),
              ),
            ),
      getCheckboxProps: record => ({
        name: record.id || 'null-id',
      }),
    }),
    [selected, setSelected],
  );
