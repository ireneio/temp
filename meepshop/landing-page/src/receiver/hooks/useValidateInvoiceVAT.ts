// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql import
import { useValidateInvoiceVAT } from '../gqls/useValidateInvoiceVAT';

// graphql typescript
import {
  useValidateInvoiceVAT as useValidateInvoiceVATType,
  useValidateInvoiceVATVariables,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (): ValidationRule['validator'] => {
  const [validateInvoiceVAT, { data, error }] = useLazyQuery<
    useValidateInvoiceVATType,
    useValidateInvoiceVATVariables
  >(useValidateInvoiceVAT);
  const { t } = useTranslation('landing-page');

  return useCallback(
    async (_rule, value, callback) => {
      validateInvoiceVAT({
        variables: {
          ban: value,
        },
      });

      if (error) return callback(t('error'));

      if (data?.isBANValid) return callback();

      return callback(t('wrong-invoice-number'));
    },
    [validateInvoiceVAT, data, error, t],
  );
};
