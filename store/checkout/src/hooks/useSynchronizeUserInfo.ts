// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';

// graphql typescript
import { useSynchronizeUserInfoFragment as useSynchronizeUserInfoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  allHidden: boolean;
  user: useSynchronizeUserInfoFragmentType | null;
}

interface ValueType
  extends Pick<
    FormInstance,
    'getFieldsValue' | 'setFieldsValue' | 'validateFields'
  > {
  checked: boolean;
}

// definition
export default ({
  allHidden,
  user,
}: PropsType): (({
  checked,
  getFieldsValue,
  setFieldsValue,
  validateFields,
}: ValueType) => void) =>
  useCallback(
    ({ checked, getFieldsValue, setFieldsValue, validateFields }) => {
      if (checked) {
        const {
          userName,
          userMobile,
          userAddressAndZipCode,
          userStreet,
        } = getFieldsValue([
          'userName',
          'userMobile',
          'userAddressAndZipCode',
          'userStreet',
        ]);

        setFieldsValue(
          allHidden
            ? {
                name: user?.name,
                mobile: user?.additionalInfo?.mobile,
                addressAndZipCode: {
                  address: [
                    user?.address?.country?.id,
                    user?.address?.city?.id,
                    user?.address?.area?.id,
                  ].filter(Boolean),
                  zipCode: user?.address?.zipCode,
                },
                street: user?.address?.street,
              }
            : {
                name: userName,
                mobile: userMobile,
                addressAndZipCode: userAddressAndZipCode,
                street: userStreet,
              },
        );

        validateFields([
          'userName',
          'userMobile',
          'userAddressAndZipCode',
          'userStreet',
          'name',
          'mobile',
          'addressAndZipCode',
          'street',
        ]);
      }
    },
    [allHidden, user],
  );
