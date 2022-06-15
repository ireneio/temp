// typescript import
import { FormItemProps } from 'antd/lib/form';

// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useValidateEmail from './hooks/useValidateEmail';

// typescript definition
interface PropsType extends FormItemProps {
  placeholder?: string;
  isNotShopper?: boolean;
  checkShopperEmail?: boolean;
  errorMessage?: string;
  disableRequired?: boolean;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    isNotShopper,
    checkShopperEmail,
    errorMessage,
    placeholder,
    rules,
    disableRequired,
    ...props
  }: PropsType) => {
    const { t } = useTranslation('form-email');
    const validateEmail = useValidateEmail(
      isNotShopper,
      checkShopperEmail,
      errorMessage,
    );

    return (
      <FormItem
        {...props}
        rules={[
          ...(disableRequired
            ? []
            : [
                {
                  required: true,
                  message: t('email-is-required'),
                },
              ]),
          {
            validator: validateEmail.validator,
          },
          ...(rules || []),
        ]}
        normalize={validateEmail.normalize}
        validateTrigger="onBlur"
        validateFirst
      >
        <Input
          type="email"
          placeholder={placeholder || t('email-placeholder')}
          size="large"
        />
      </FormItem>
    );
  },
);
