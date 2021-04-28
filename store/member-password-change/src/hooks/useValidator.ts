// typescript import
import { ValidationRule } from 'antd/lib/form';
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default ({
  getFieldValue,
}: FormComponentProps['form']): ValidationRule['validator'] => {
  const { t } = useTranslation('member-password-change');

  return useCallback(
    (_, value, callback) => {
      if (value && value !== getFieldValue('newPassword'))
        return callback(t('form.password-not-match'));
      return callback();
    },
    [t, getFieldValue],
  );
};
