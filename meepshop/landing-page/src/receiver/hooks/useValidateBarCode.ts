// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql import
import { useValidateBarCode } from '../gqls/useValidateBarCode';

// grapqhql typescript
import {
  useValidateBarCode as useValidateBarCodeType,
  useValidateBarCodeVariables,
} from '../gqls/__generated__/useValidateBarCode';

// definition
export default (): ValidationRule['validator'] => {
  const [validateBarCode, { data, error }] = useLazyQuery<
    useValidateBarCodeType,
    useValidateBarCodeVariables
  >(useValidateBarCode);
  const { t } = useTranslation('landing-page');

  return useCallback(
    async (_rule, value, callback) => {
      validateBarCode({
        variables: {
          barCode: value,
        },
      });

      if (error) return callback(t('error'));

      if (data?.isEInvoiceBarCodeValid) return callback();

      return callback(t('wrong-barcode'));
    },
    [validateBarCode, data, error, t],
  );
};
