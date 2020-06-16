// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateRecipientAddress as updateRecipientAddressType,
  updateRecipientAddressVariables,
} from './__generated__/updateRecipientAddress';
import { useUpdateRecipientAddressFragment } from './__generated__/useUpdateRecipientAddressFragment';

// definition
const mutation = gql`
  mutation updateRecipientAddress($input: UpdateRecipientAddressInput!) {
    updateRecipientAddress(input: $input) {
      status
    }
  }
`;

export default (): MutationFunction<
  updateRecipientAddressType,
  updateRecipientAddressVariables
> => {
  const { t } = useTranslation('member-recipients');
  const [updateRecipientAddress] = useMutation<
    updateRecipientAddressType,
    updateRecipientAddressVariables
  >(mutation);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    updateRecipientAddressType,
    updateRecipientAddressVariables
  >) =>
    updateRecipientAddress({
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

        cache.writeFragment<useUpdateRecipientAddressFragment>({
          id,
          fragment: gql`
            fragment useUpdateRecipientAddressFragment on RecipientAddress {
              id
              name
              mobile
              country {
                id
              }
              city {
                id
              }
              area {
                id
              }
              zipCode
              street
            }
          `,
          data: {
            ...newRecipientAddress,
            __typename: 'RecipientAddress',
            id,
            country: {
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
          } as useUpdateRecipientAddressFragment,
        });

        notification.success({ message: t('mutation.success') });
      },
    });
};
