// typescript import
import { FormComponentProps } from 'antd/lib/form';
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateUser as updateUserType,
  updateUserVariables,
  useSubmitReadCache,
  useSubmitUpdateCache,
} from '@meepshop/types/gqls/store';

// definition
const mutation = gql`
  mutation updateUser($input: UpdateShopperInfoInput!) {
    updateShopperInformation(input: $input) {
      status
    }
  }
`;

export default ({
  validateFieldsAndScroll,
}: FormComponentProps['form']): ((e: React.FormEvent<HTMLElement>) => void) => {
  const { t } = useTranslation('member-settings');
  const [updateUser] = useMutation<updateUserType, updateUserVariables>(
    mutation,
  );

  return useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      validateFieldsAndScroll(async (err, values) => {
        e.preventDefault();

        if (err) return;

        const {
          name = null,
          gender = null,
          tel = null,
          mobile = null,
          birthday = null,
          street = null,
          isNotCancelEmail = false,
          addressAndZipCode: { address, zipCode } = {
            address: [],
            zipCode: null,
          },
        } = values;
        const input = {
          name,
          gender,
          birthday: !birthday
            ? null
            : {
                year: parseInt(birthday.format('YYYY'), 10),
                month: parseInt(birthday.format('M'), 10),
                day: parseInt(birthday.format('D'), 10),
              },
          additionalInfo: {
            tel,
            mobile,
          },
          address: {
            countryId: address[0],
            cityId: address[1],
            areaId: address[2],
            street,
            zipCode,
          },
          notification: {
            newsletters: {
              cancelEmail: !isNotCancelEmail,
            },
          },
        };

        updateUser({
          variables: {
            input,
          },
          update: (cache: DataProxy, { data }: { data: updateUserType }) => {
            if (data.updateShopperInformation.status !== 'OK') {
              notification.error({
                message: t('update-user.fail'),
              });
              return;
            }

            notification.success({
              message: t('update-user.success'),
            });

            const viewerCache = cache.readQuery<useSubmitReadCache>({
              query: gql`
                query useSubmitReadCache {
                  viewer {
                    id
                  }
                }
              `,
            });
            const id = viewerCache?.viewer?.id;

            if (!id) return;

            cache.writeFragment<useSubmitUpdateCache>({
              id,
              fragment: gql`
                fragment useSubmitUpdateCache on User {
                  id
                  name
                  gender
                  birthday {
                    year
                    month
                    day
                  }
                  additionalInfo {
                    tel
                    mobile
                  }
                  address {
                    country {
                      id
                    }
                    city {
                      id
                    }
                    area {
                      id
                    }
                    street
                    zipCode
                  }
                  notification {
                    newsletters {
                      cancelEmail
                    }
                  }
                }
              `,
              data: {
                ...input,
                __typename: 'User',
                id,
                birthday: !input.birthday
                  ? null
                  : {
                      ...input.birthday,
                      __typename: 'BirthdayObjectType',
                    },
                additionalInfo: {
                  ...input.additionalInfo,
                  __typename: 'AdditionalInfoObjectType',
                },
                address: {
                  ...input.address,
                  __typename: 'Address',
                  country: !input.address.countryId
                    ? null
                    : {
                        __typename: 'Country',
                        id: input.address.countryId,
                      },
                  city: !input.address.cityId
                    ? null
                    : {
                        __typename: 'City',
                        id: input.address.cityId,
                      },
                  area: !input.address.areaId
                    ? null
                    : {
                        __typename: 'Area',
                        id: input.address.areaId,
                      },
                },
                notification: {
                  __typename: 'NotificationObjectType',
                  newsletters: {
                    ...input.notification.newsletters,
                    __typename: 'newsletters',
                  },
                },
              },
            });
          },
        });
      });
    },
    [validateFieldsAndScroll, t, updateUser],
  );
};
