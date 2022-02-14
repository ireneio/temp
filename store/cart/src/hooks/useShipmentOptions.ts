// typescript import
import { CheckboxOptionType } from 'antd/lib/checkbox';

// import
import { useMemo } from 'react';

import { useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { useShipmentOptionsFragment as useShipmentOptionsFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface OptionsType extends CheckboxOptionType {
  description: string;
}

// definition
export default (
  storeShipments: useShipmentOptionsFragmentType[],
): OptionsType[] => {
  const getLanguage = useGetLanguage();

  return useMemo(
    () =>
      storeShipments.map(({ id, title, description }) => ({
        value: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
        label: getLanguage(title),
        description: getLanguage(description),
      })),
    [getLanguage, storeShipments],
  );
};
