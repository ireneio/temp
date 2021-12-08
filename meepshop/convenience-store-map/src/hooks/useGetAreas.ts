// typescript import
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

// graphql typescript
import {
  ConvenienceStoreTypeEnum as ConvenienceStoreTypeEnumType,
  addressSelectCityFragment as addressSelectCityFragmentType,
  ConvenienceStoreShipmentTypeEnum as ConvenienceStoreShipmentTypeEnumType,
  getValidatedConvenienceStoreAreas as getValidatedConvenienceStoreAreasType,
  getValidatedConvenienceStoreAreasVariables as getValidatedConvenienceStoreAreasVariablesType,
  getValidatedConvenienceStoreCities_validatedConvenienceStoreCities_children as getValidatedConvenienceStoreCitiesValidatedConvenienceStoreCitiesChildrenType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  addressSelectCityFragment,
  getValidatedConvenienceStoreAreas,
} from '../gqls/useGetAreas';

// definition
export default ({
  shipmentType,
  storeTypes,
}: {
  shipmentType: ConvenienceStoreShipmentTypeEnumType;
  storeTypes: ConvenienceStoreTypeEnumType[];
}): ((selectedOptions: CascaderOptionType[]) => void) => {
  const [getAreas, { variables, client }] = useLazyQuery<
    getValidatedConvenienceStoreAreasType,
    getValidatedConvenienceStoreAreasVariablesType
  >(getValidatedConvenienceStoreAreas, {
    onCompleted: ({ validatedConvenienceStoreAreas }) => {
      const cityId = variables?.input.cityId;

      if (!cityId) return;

      client.writeFragment<addressSelectCityFragmentType>({
        id: cityId,
        fragment: addressSelectCityFragment,
        data: {
          __typename: 'City',
          id: cityId,
          cvsAreas: validatedConvenienceStoreAreas.map(
            (
              area: getValidatedConvenienceStoreCitiesValidatedConvenienceStoreCitiesChildrenType,
            ) => ({ ...area, streets: [] }),
          ),
        },
      });
    },
  });

  return useCallback(
    (selectedOptions: CascaderOptionType[]) => {
      const selectedOption = selectedOptions[selectedOptions.length - 1];

      if (!selectedOption.value) return;

      getAreas({
        variables: {
          input: {
            shipmentType,
            storeTypes,
            cityId: selectedOption.value as string,
          },
        },
      });
    },
    [getAreas, shipmentType, storeTypes],
  );
};
