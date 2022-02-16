// typescript import
import { FormItemProps } from 'antd/lib/form';

// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useValidatePagePath from './hooks/useValidatePagePath';

// definition
const { Item: FormItem } = Form;

export default React.memo(({ initialValue, ...props }: FormItemProps) => {
  const { t } = useTranslation('page-manager');
  const validatePagePath = useValidatePagePath(initialValue);

  return (
    <FormItem
      {...props}
      name={['path']}
      initialValue={initialValue}
      rules={[
        {
          required: true,
          message: t('form.required'),
        },
        {
          validator: validatePagePath,
        },
      ]}
    >
      <Input placeholder={t('form.path.placeholder')} />
    </FormItem>
  );
});
