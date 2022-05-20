// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

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
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      const { data } = await client.query<
        isEInvoiceBarCodeValidType,
        isEInvoiceBarCodeValidVariablesType
      >({
        query: isEInvoiceBarCodeValid,
        variables: {
          barCode: value,
        },
      });

      if (!data?.isEInvoiceBarCodeValid) throw new Error(t('wrong-barcode'));
    },
    [client, t],
  );
};
