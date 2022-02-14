// import
import { useMemo } from 'react';

import { useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { useSpecificShipmentOptionFragment as useSpecificShipmentOptionFragmentType } from '@meepshop/types/gqls/store';

// typescription definition
export type OptionType = { label: string; value: string }[];

// definition
export default (
  storeShipment: useSpecificShipmentOptionFragmentType[],
): OptionType => {
  const getLanguage = useGetLanguage();

  return useMemo(
    () =>
      storeShipment.map(({ title, id }) => ({
        label: getLanguage(title),
        value: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
      })),
    [getLanguage, storeShipment],
  );
};
