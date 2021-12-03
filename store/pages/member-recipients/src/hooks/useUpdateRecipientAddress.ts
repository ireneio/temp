// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateRecipientAddress as updateRecipientAddressType,
  updateRecipientAddressVariables,
  useUpdateRecipientAddressFragment as useUpdateRecipientAddressFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  updateRecipientAddress,
  useUpdateRecipientAddressFragment,
} from '../gqls/useUpdateRecipientAddress';

// definition
export default (): ((
  input: updateRecipientAddressVariables['input'],
) => Promise<void>) => {
  const { t } = useTranslation('member-recipients');
  const [mutation] = useMutation<
    updateRecipientAddressType,
    updateRecipientAddressVariables
  >(updateRecipientAddress);

  return useCallback(
    async (input: updateRecipientAddressVariables['input']) => {
      await mutation({
        variables: { input },
        update: (
          cache: DataProxy,
          { data }: { data: updateRecipientAddressType },
        ) => {
          if (data.updateRecipientAddress.status !== 'OK') {
            notification.error({ message: t('mutation.failure') });
            return;
          }

          const {
            id,
            countryId,
            cityId,
            areaId,
            ...newRecipientAddress
          } = input;

          cache.writeFragment<useUpdateRecipientAddressFragmentType>({
            id,
            fragment: useUpdateRecipientAddressFragment,
            data: {
              ...(newRecipientAddress as useUpdateRecipientAddressFragmentType),
              __typename: 'RecipientAddress',
              id,
              country: !countryId
                ? null
                : {
                    __typename: 'Country',
                    id: countryId,
                  },
              city: !cityId
                ? null
                : {
                    __typename: 'City',
                    id: cityId,
                  },
              area: !areaId
                ? null
                : {
                    __typename: 'Area',
                    id: areaId,
                  },
            },
          });

          notification.success({ message: t('mutation.success') });
        },
      });
    },
    [t, mutation],
  );
};
