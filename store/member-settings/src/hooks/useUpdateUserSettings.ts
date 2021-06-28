// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateUser as updateUserType,
  updateUserVariables,
  useUpdateUserSettingsFragment as useUpdateUserSettingsFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  updateUser,
  useUpdateUserSettingsFragment,
} from '../gqls/useUpdateUserSettings';

// typescript definition
interface ValuesType {
  name: string | null;
  gender: 0 | 1 | null;
  additionalInfo: {
    tel: string | null;
    mobile: string | null;
  };
  birthday?: moment.Moment;
  addressAndZipCode?: {
    address: string[];
    zipCode: string;
  };
  street?: string;
  isNotCancelNewslettersEmail: boolean;
  isNotCancelRewardPointReminderSubscriptionEmail?: boolean;
}

// definition
export default (id: string | null): ((values: ValuesType) => void) => {
  const { t } = useTranslation('member-settings');
  const [mutation] = useMutation<updateUserType, updateUserVariables>(
    updateUser,
  );

  return useCallback(
    ({
      birthday,
      addressAndZipCode: {
        address: [countryId, cityId, areaId] = [],
        zipCode = null,
      } = {},
      street = null,
      isNotCancelNewslettersEmail,
      isNotCancelRewardPointReminderSubscriptionEmail,
      ...values
    }) => {
      const input = {
        ...values,
        birthday: !birthday
          ? null
          : {
              year: parseInt(birthday.format('YYYY'), 10),
              month: parseInt(birthday.format('M'), 10),
              day: parseInt(birthday.format('D'), 10),
            },
        address: {
          countryId,
          cityId,
          areaId,
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

          cache.writeFragment<useUpdateUserSettingsFragmentType>({
            id,
            fragment: useUpdateUserSettingsFragment,
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
                rewardPointReminderSubscription: {
                  ...input.notification.rewardPointReminderSubscription,
                  __typename: 'RewardPointReminderSubscription',
                },
              },
            },
          });
        },
      });
    },
    [id, t, mutation],
  );
};
