// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

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
export default (): MutationFunction<
  updateRecipientAddressType,
  updateRecipientAddressVariables
> => {
  const { t } = useTranslation('member-recipients');
  const [mutation] = useMutation<
    updateRecipientAddressType,
    updateRecipientAddressVariables
  >(updateRecipientAddress);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    updateRecipientAddressType,
    updateRecipientAddressVariables
  >) =>
    mutation({
      ...options,
      variables,
      update: (
        cache: DataProxy,
        { data }: { data: updateRecipientAddressType },
      ) => {
        if (data.updateRecipientAddress.status !== 'OK') {
          notification.error({ message: t('mutation.failure') });
          return;
        }

        const input = variables?.input;

        if (!input) return;

        const { id, countryId, cityId, areaId, ...newRecipientAddress } = input;

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
};
