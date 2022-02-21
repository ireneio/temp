// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useRef, useCallback } from 'react';

// graphql typescript
import { useSaveAsReceiverTemplateFragment as useSaveAsReceiverTemplateFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
export interface PropsType {
  isLogin: boolean;
  user: useSaveAsReceiverTemplateFragmentType | null;
}

interface ReturnType {
  canSaveAsTemplate: ({
    getFieldValue,
    setFieldsValue,
  }: {
    getFieldValue: FormInstance['getFieldValue'];
    setFieldsValue: FormInstance['setFieldsValue'];
  }) => boolean;
  setReceiverWithTemplate: ({
    id,
    setFieldsValue,
  }: {
    id: string;
    setFieldsValue: FormInstance['setFieldsValue'];
  }) => void;
}

// definition
export default ({ isLogin, user }: PropsType): ReturnType => {
  const saveAsTemplateRef = useRef<boolean>();

  return {
    canSaveAsTemplate: useCallback(
      ({ getFieldValue, setFieldsValue }) => {
        const saveAsTemplate =
          isLogin &&
          ['blackcat', 'overseas', 'chunghwaPost', 'others'].includes(
            getFieldValue(['shipment'])?.template || '',
          );

        if (saveAsTemplateRef.current !== saveAsTemplate)
          setFieldsValue({ isSaveAsReceiverTemplate: false });

        saveAsTemplateRef.current = saveAsTemplate;
        return saveAsTemplate;
      },
      [isLogin],
    ),
    setReceiverWithTemplate: useCallback(
      ({ id, setFieldsValue }) => {
        const { name, mobile, country, city, area, street, zipCode } =
          user?.shippableRecipientAddresses?.find(
            ({ id: recipientId }) => recipientId === id,
          ) || {};

        setFieldsValue({
          name,
          mobile,
          addressAndZipCode: {
            address: [country?.id, city?.id, area?.id].filter(Boolean),
            zipCode,
          },
          street,
        });
      },
      [user],
    ),
  };
};
