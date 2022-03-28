// typescript import
import { FormItemProps } from 'antd';
import { IsURLOptions } from 'validator';

// import
import React from 'react';
import { Form, Input } from 'antd';

import useValidateUrl from './hooks/useValidateUrl';

// typescript definition
interface PropsType extends FormItemProps {
  options?: IsURLOptions;
  placeholder?: string;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ placeholder, options, ...props }: PropsType) => {
  const validateUrl = useValidateUrl(options);

  return (
    <FormItem
      {...props}
      rules={[
        {
          validator: validateUrl,
        },
      ]}
    >
      <Input placeholder={placeholder} />
    </FormItem>
  );
});
