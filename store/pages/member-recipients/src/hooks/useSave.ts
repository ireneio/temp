// import
import { useCallback } from 'react';

import useAddRecipientAddress from './useAddRecipientAddress';
import useUpdateRecipientAddress from './useUpdateRecipientAddress';

// typescript definition
interface ValuesType {
  name?: string;
  mobile?: string;
  addressAndZipCode?: {
    address: string[];
    zipCode: string;
  };
  street?: string;
}

// definition
export default (
  id: string | undefined,
  reset: () => void,
): ((values: ValuesType) => void) => {
  const addRecipientAddress = useAddRecipientAddress();
  const updateRecipientAddress = useUpdateRecipientAddress();

  return useCallback(
    async ({
      addressAndZipCode: {
        address: [countryId, cityId, areaId] = [],
        zipCode,
      } = {},
      ...input
    }) => {
      if (!id)
        await addRecipientAddress({
          ...input,
          countryId,
          cityId,
          areaId,
          zipCode,
        });
      else
        await updateRecipientAddress({
          ...input,
          id,
          countryId,
          cityId,
          areaId,
          zipCode,
        });

      reset();
    },
    [id, reset, addRecipientAddress, updateRecipientAddress],
  );
};
