// import
import { useCallback } from 'react';
import { filter } from 'graphql-anywhere';

import useAddRecipientAddress from './useAddRecipientAddress';
import useUpdateRecipientAddress from './useUpdateRecipientAddress';

// graphql typescript
import { useSaveFragment as useSaveFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useAddRecipientAddressFragment } from '../gqls/useAddRecipientAddress';

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

interface PropsType {
  viewer: useSaveFragmentType;
  id: string | undefined;
  reset: () => void;
}
// definition
export default ({
  viewer,
  id,
  reset,
}: PropsType): ((values: ValuesType) => void) => {
  const addRecipientAddress = useAddRecipientAddress(
    filter(useAddRecipientAddressFragment, viewer),
  );
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
