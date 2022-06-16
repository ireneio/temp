// typescript import
import { FormItemProps } from 'antd';

import { PropsType as AddressCascaderPropsType } from './AddressCascader';

// import
import React from 'react';
import { Form } from 'antd';

import AddressCascader from './AddressCascader';
import useValidator from './hooks/useValidator';

// typescript definition
interface PropsType
  extends FormItemProps,
    Omit<AddressCascaderPropsType, 'forwardedRef'> {
  rootClassName?: string;
  enableValidator?: boolean;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    rootClassName,
    size,
    placeholder,
    shippableCountries,
    enableValidator,
    ...formItemProps
  }: PropsType): React.ReactElement => {
    const validator = useValidator();

    return (
      <FormItem
        {...formItemProps}
        rules={
          !enableValidator
            ? []
            : [
                {
                  validator,
                },
              ]
        }
      >
        <AddressCascader
          className={rootClassName}
          size={size}
          placeholder={placeholder}
          shippableCountries={shippableCountries}
        />
      </FormItem>
    );
  },
);
