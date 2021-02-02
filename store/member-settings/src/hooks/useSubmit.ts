// typescript import
import { FormComponentProps } from 'antd/lib/form';
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateUser as updateUserType,
  updateUserVariables,
  useSubmitUserFragment as useSubmitUserFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { updateUser, useSubmitUserFragment } from '../gqls/useSubmit';

// definition
export default (
  id: string | null,
  { validateFieldsAndScroll }: FormComponentProps['form'],
): ((e: React.FormEvent<HTMLElement>) => void) => {
  const { t } = useTranslation('member-settings');
  const [mutation] = useMutation<updateUserType, updateUserVariables>(
    updateUser,
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
          isNotCancelNewslettersEmail = false,
          isNotCancelRewardPointReminderSubscriptionEmail = false,
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
              cancelEmail: !isNotCancelNewslettersEmail,
            },
            rewardPointReminderSubscription: {
              cancelEmail: !isNotCancelRewardPointReminderSubscriptionEmail,
            },
          },
        };

        mutation({
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

            if (!id) return;

            cache.writeFragment<useSubmitUserFragmentType>({
              id,
              fragment: useSubmitUserFragment,
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
    [id, validateFieldsAndScroll, t, mutation],
  );
};
