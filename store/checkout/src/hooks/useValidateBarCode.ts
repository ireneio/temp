// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  isEInvoiceBarCodeValid as isEInvoiceBarCodeValidType,
  isEInvoiceBarCodeValidVariables as isEInvoiceBarCodeValidVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { isEInvoiceBarCodeValid } from '../gqls/useValidateBarCode';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('checkout');
  const [validate, { data }] = useLazyQuery<
    isEInvoiceBarCodeValidType,
    isEInvoiceBarCodeValidVariablesType
  >(isEInvoiceBarCodeValid);

  return useCallback(
    async (_, value) => {
      validate({ variables: { barCode: value } });

      if (!data?.isEInvoiceBarCodeValid) throw new Error(t('wrong-barcode'));
    },
    [t, validate, data],
  );
};
