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
          viewerName,
          viewerMobile,
          viewerAddressAndZipCode,
          viewerStreet,
        } = getFieldsValue([
          'viewerName',
          'viewerMobile',
          'viewerAddressAndZipCode',
          'viewerStreet',
        ]);

        setFieldsValue(
          allHidden
            ? {
                name: user?.name,
                mobile: user?.mobile,
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
                name: viewerName,
                mobile: viewerMobile,
                addressAndZipCode: viewerAddressAndZipCode,
                street: viewerStreet,
              },
        );

        validateFields([
          'viewerName',
          'viewerMobile',
          'viewerAddressAndZipCode',
          'viewerStreet',
          'name',
          'mobile',
          'addressAndZipCode',
          'street',
        ]);
      }
    },
    [allHidden, user],
  );
