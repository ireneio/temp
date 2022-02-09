// typescript import
import { OptionsType } from '../constants';

// import
import { useCallback, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';

import { LOGIN } from '../constants';

// graphql typescript
import { UserTypeEnum as UserTypeEnumType } from '@meepshop/types/gqls/store';

// graphql typescript
import {
  signup as signupType,
  signupVariables as signupVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { signup } from '../gqls/useSignup';

// typescript definition
interface SignupType {
  mobile?: string;
  addressAndZipCode?: {
    address: string[];
    zipCode: string;
  };
  email: string;
  password: string;
  registeredCode?: string;
  street?: string;
}

// definition
export default (
  setOptions: (option: OptionsType) => void,
): ((value: SignupType) => void) => {
  const { t } = useTranslation('login');
  const adTrack = useContext(AdTrackContext);
  const [mutation] = useMutation<signupType, signupVariablesType>(signup, {
    onCompleted: data => {
      if ((data?.createUserList || []).length === 0) {
        notification.error({
          message: t('signup-failure-message'),
        });
        return;
      }

      notification.success({ message: t('signup-success') });
      setOptions(LOGIN);
      adTrack.completeRegistration();
    },
  });

  return useCallback(
    ({
      email,
      password,
      registeredCode,
      mobile,
      addressAndZipCode,
      street,
    }) => {
      mutation({
        variables: {
          search: [
            {
              type: 'SHOPPER' as UserTypeEnumType,
              email,
              password,
              registeredCode,
              mobile,
              additionalInfo: {
                mobile,
              },
              address: {
                countryId: addressAndZipCode?.address[0],
                cityId: addressAndZipCode?.address[1],
                areaId: addressAndZipCode?.address[2],
                zipCode: addressAndZipCode?.zipCode,
                street,
              },
            },
          ],
        },
      });
    },
    [mutation],
  );
};
