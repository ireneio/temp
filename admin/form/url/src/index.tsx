// typescript import
import { FormItemProps } from 'antd';

// import
import React from 'react';
import { Form, Input } from 'antd';

import useValidateUrl from './hooks/useValidateUrl';

// typescript definition
interface PropsType extends FormItemProps {
  placeholder?: string;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ placeholder, ...props }: PropsType) => {
  const validateUrl = useValidateUrl();

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
