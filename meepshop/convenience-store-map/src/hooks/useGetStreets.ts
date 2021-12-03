// typescript import
import { CascaderOptionType } from 'antd/lib/cascader';

import { ConvenienceStoresInputType } from '../StoreList';

// import
import { useCallback } from 'react';
import { useQuery } from '@apollo/client';

// graqhql typescript
import {
  useGetStreetFragment as useGetStreetFragmentType,
  ConvenienceStoreTypeEnum as ConvenienceStoreTypeEnumType,
  ConvenienceStoreShipmentTypeEnum as ConvenienceStoreShipmentTypeEnumType,
  getValidatedConvenienceStoreStreets as getValidatedConvenienceStoreStreetsType,
  getValidatedConvenienceStoreStreetsVariables as getValidatedConvenienceStoreStreetsVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  useGetStreetFragment,
  getValidatedConvenienceStoreStreets,
} from '../gqls/useGetStreets';

// definition
export default ({
  shipmentType,
  storeTypes,
  variables: { cityId, areaId },
  setVariables,
}: {
  shipmentType: ConvenienceStoreShipmentTypeEnumType;
  storeTypes: ConvenienceStoreTypeEnumType[];
  variables: ConvenienceStoresInputType;
  setVariables: (value: ConvenienceStoresInputType) => void;
}): {
  streets: string[];
  getStreets: (value: string[], selectedOptions: CascaderOptionType[]) => void;
} => {
  const { data: streets, client } = useQuery<
    getValidatedConvenienceStoreStreetsType,
    getValidatedConvenienceStoreStreetsVariablesType
  >(getValidatedConvenienceStoreStreets, {
    skip: !areaId,
    variables: {
      input: { areaId: areaId as string, shipmentType, storeTypes },
    },
  });

  return {
    streets: streets?.validatedConvenienceStoreStreets || [],
    getStreets: useCallback(
      (value: string[]) => {
        const [newCityId, newAreaId] = value;

        if (newCityId === cityId && newAreaId === areaId) return;

        if (value.length === 1) {
          setVariables({ cityId: newCityId });

          if (areaId) {
            client.writeFragment<useGetStreetFragmentType>({
              id: areaId,
              fragment: useGetStreetFragment,
              data: {
                __typename: 'Area',
                id: areaId,
                streets: [],
              },
            });
          }
        }

        if (value.length === 2) {
          setVariables({
            cityId: newCityId,
            areaId: newAreaId,
          });
        }
      },
      [client, setVariables, cityId, areaId],
    ),
  };
};
