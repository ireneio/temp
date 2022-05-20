// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  isEInvoiceLoveCodeValid as isEInvoiceLoveCodeValidType,
  isEInvoiceLoveCodeValidVariables as isEInvoiceLoveCodeValidVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { isEInvoiceLoveCodeValid } from '../gqls/useValidateLoveCode';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('checkout');
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      const { data } = await client.query<
        isEInvoiceLoveCodeValidType,
        isEInvoiceLoveCodeValidVariablesType
      >({
        query: isEInvoiceLoveCodeValid,
        variables: {
          loveCode: value,
        },
      });

      if (!data?.isEInvoiceLoveCodeValid)
        throw new Error(t('wrong-donate-code'));
    },
    [client, t],
  );
};
