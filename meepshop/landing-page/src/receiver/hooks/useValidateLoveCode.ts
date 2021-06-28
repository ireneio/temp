// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql import
import { useValidateLoveCode } from '../gqls/useValidateLoveCode';

// graphql typescript
import {
  useValidateLoveCode as useValidateLoveCodeType,
  useValidateLoveCodeVariables,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
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
