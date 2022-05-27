// typescript import
import { TableRowSelection } from 'antd/lib/table/interface';
import { FormInstance } from 'antd/lib/form';

import { ReturnType } from './useComputedCart';
import { ValuesType } from './useInitialValue';

// import
import { useMemo, useContext } from 'react';

import { Sensor as SensorContext } from '@meepshop/context';

// graphql typescript
import { useProductsColumnsLineItemFragment as useProductsColumnsLineItemFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType
  extends Pick<FormInstance, 'setFieldsValue'>,
    Pick<ReturnType, 'refetch' | 'variables'> {
  requireDesignatedShipment: boolean;
  products: ValuesType['products'];
}

// definition
export default ({
  requireDesignatedShipment,
  products,
  setFieldsValue,
  refetch,
  variables,
}: PropsType):
  | TableRowSelection<useProductsColumnsLineItemFragmentType>
  | undefined => {
  const { isMobile } = useContext(SensorContext);

  return useMemo(
    () =>
      !requireDesignatedShipment
        ? undefined
        : {
            type: 'checkbox',
            columnWidth: isMobile ? '30px' : '64px',
            preserveSelectedRowKeys: true,
            hideSelectAll: true,
            selectedRowKeys: products.map(
              product => `${product.type}-${product.variantId}`,
            ),
            onSelect: (record, select) => {
              const cartItems = [...(variables?.input.cartItems || [])];
              const cartItem = cartItems.find(
                item => item.variantId === record.variantId,
              );

              if (!select) {
                if (cartItem) cartItem.isSelectedForCompute = false;

                setFieldsValue({
                  products: products.filter(
                    product => product.variantId !== record.variantId,
                  ),
                });
              } else {
                if (cartItem) cartItem.isSelectedForCompute = true;

                setFieldsValue({ products: [...products, record] });
              }

              refetch({
                input: {
                  ...variables?.input,
                  cartItems,
                },
              });
            },
            getCheckboxProps: record => ({
              name: record.variantId || 'null-id',
            }),
            renderCell: (_, { type }, __, originNode) => {
              if (type === 'GIFT') return null;

              return originNode;
            },
          },
    [
      isMobile,
      products,
      refetch,
      requireDesignatedShipment,
      setFieldsValue,
      variables,
    ],
  );
};
