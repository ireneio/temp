// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql import
import { useValidateLoveCode } from '../gqls/useValidateLoveCode';

// grapqhql typescript
import {
  useValidateLoveCode as useValidateLoveCodeType,
  useValidateLoveCodeVariables,
} from '../gqls/__generated__/useValidateLoveCode';

// definition
export default (): ValidationRule['validator'] => {
  const [validateLoveCode, { data, error }] = useLazyQuery<
    useValidateLoveCodeType,
    useValidateLoveCodeVariables
  >(useValidateLoveCode);
  const { t } = useTranslation('landing-page');

  return useCallback(
    async (_rule, value, callback) => {
      validateLoveCode({
        variables: {
          loveCode: value,
        },
      });

      if (error) return callback(t('error'));

      if (data?.isEInvoiceLoveCodeValid) return callback();

      return callback(t('wrong-donate-code'));
    },
    [validateLoveCode, data, error, t],
  );
};
