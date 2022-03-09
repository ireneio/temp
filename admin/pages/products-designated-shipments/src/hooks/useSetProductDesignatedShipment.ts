// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  setProductDesignatedShipment as setProductDesignatedShipmentType,
  useSetProductDesignatedShipmentFragment as useSetProductDesignatedShipmentFragmentType,
  setProductDesignatedShipmentVariables as setProductDesignatedShipmentVariablesType,
  applicableShipmentsModalProductFragment as applicableShipmentsModalProductFragmentType,
  useSetProductDesignatedShipmentStoreShipmentFragment as useSetProductDesignatedShipmentStoreShipmentFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  setProductDesignatedShipment,
  useSetProductDesignatedShipmentFragment,
} from '../gqls/useSetProductDesignatedShipment';

// typescript definition
interface ValuesType {
  applicableShipmentIds?: string[];
}

// definition
export default (
  selectedProducts: applicableShipmentsModalProductFragmentType[],
  products: useSetProductDesignatedShipmentFragmentType | null,
  storeId: string | null,
  shipments: useSetProductDesignatedShipmentStoreShipmentFragmentType[],
  close: () => void,
): ((input: ValuesType) => void) => {
  const [mutation] = useMutation<
    setProductDesignatedShipmentType,
    setProductDesignatedShipmentVariablesType
  >(setProductDesignatedShipment);

  return useCallback(
    ({ applicableShipmentIds }) => {
      if (!storeId || !selectedProducts.length || !products) return;

      mutation({
        variables: {
          input: {
            applicableShipmentIds: applicableShipmentIds || [],
            productIds: selectedProducts
              .map(product => product.id)
              .filter(Boolean) as string[],
            requireDesignatedShipment: !!applicableShipmentIds,
          },
        },
        update: (cache, { data }) => {
          if (data?.setProductDesignatedShipment.__typename !== 'OkResponse')
            return;

          cache.writeFragment<useSetProductDesignatedShipmentFragmentType>({
            id: storeId,
            fragment: useSetProductDesignatedShipmentFragment,
            fragmentName: 'useSetProductDesignatedShipmentFragment',
            data: {
              ...products,
              edges: products.edges.map(product => {
                const selected = selectedProducts
                  .map(select => select.id)
                  .filter(Boolean) as string[];

                if (selected.includes(product.node.id || '')) {
                  return {
                    ...product,
                    node: {
                      ...product.node,
                      applicableShipments: [
                        ...((applicableShipmentIds || [])
                          .map(
                            id =>
                              shipments.find(shipment => shipment.id === id) ||
                              null,
                          )
                          .filter(
                            Boolean,
                          ) as useSetProductDesignatedShipmentStoreShipmentFragmentType[]),
                      ],
                      requireDesignatedShipment: !!applicableShipmentIds,
                    },
                  };
                }

                return product;
              }),
            },
          });

          close();
        },
      });
    },
    [close, mutation, products, selectedProducts, shipments, storeId],
  );
};
