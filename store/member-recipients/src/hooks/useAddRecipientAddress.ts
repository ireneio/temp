// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notification } from 'antd';

import { useTranslation } from '@store/utils/lib/i18n';

// graphql typescript
import {
  addRecipientAddress as addRecipientAddressType,
  addRecipientAddressVariables,
} from './__generated__/addRecipientAddress';
import { useAddRecipientAddressGetRecipientAddressBookCache as useAddRecipientAddressGetRecipientAddressBookCacheType } from './__generated__/useAddRecipientAddressGetRecipientAddressBookCache';
import { useAddRecipientAddressFragment } from './__generated__/useAddRecipientAddressFragment';

// definition
const mutation = gql`
  mutation addRecipientAddress($input: AddRecipientAddressInput!) {
    addRecipientAddress(input: $input) {
      status
      recipientAddressId
    }
  }
`;

export default (): MutationFunction<
  addRecipientAddressType,
  addRecipientAddressVariables
> => {
  const { t } = useTranslation('member-recipients');
  const [addRecipientAddress] = useMutation<
    addRecipientAddressType,
    addRecipientAddressVariables
  >(mutation);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    addRecipientAddressType,
    addRecipientAddressVariables
  >) =>
    addRecipientAddress({
      ...options,
      variables,
      update: (
        cache: DataProxy,
        { data }: { data: addRecipientAddressType },
      ) => {
        if (data.addRecipientAddress.status !== 'OK') {
          notification.error({
            message: t('mutation.failure'),
          });
          return;
        }

        const { recipientAddressId } = data.addRecipientAddress;
        const useAddRecipientAddressGetRecipientAddressBookCache = cache.readQuery<
          useAddRecipientAddressGetRecipientAddressBookCacheType
        >({
          query: gql`
            query useAddRecipientAddressGetRecipientAddressBookCache {
              viewer {
                id
                recipientAddressBook {
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
              }
            }
          `,
        });

        const input = variables?.input;
        const { id: viewerId, recipientAddressBook } =
          useAddRecipientAddressGetRecipientAddressBookCache?.viewer || {};

        if (!input || !viewerId || !recipientAddressBook) return;

        const { countryId, cityId, areaId, ...newRecipientAddress } = input;

        cache.writeFragment<useAddRecipientAddressFragment>({
          id: viewerId,
          fragment: gql`
            fragment useAddRecipientAddressFragment on User {
              id
              recipientAddressBook {
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
            }
          `,
          data: {
            __typename: 'User',
            id: viewerId,
            recipientAddressBook: [
              ...recipientAddressBook,
              {
                ...newRecipientAddress,
                __typename: 'RecipientAddress',
                id: recipientAddressId,
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
              },
            ],
          } as useAddRecipientAddressFragment,
        });

        notification.success({ message: t('mutation.success') });
      },
    });
};
