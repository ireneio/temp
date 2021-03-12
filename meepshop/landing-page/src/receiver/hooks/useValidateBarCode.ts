// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql import
import { useValidateBarCode } from '../gqls/useValidateBarCode';

// graphql typescript
import {
  useValidateBarCode as useValidateBarCodeType,
  useValidateBarCodeVariables,
} from '@meepshop/types/gqls/meepshop';

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
