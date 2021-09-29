// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  isMerchantEmailUsable as isMerchantEmailUsableType,
  isMerchantEmailUsableVariables as isMerchantEmailUsableVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { isMerchantEmailUsable } from '../gqls/useValidateMerchantEmail';

// definition
export default (): ((_: unknown, value: string) => void) => {
  const { t } = useTranslation('sign-up');
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      const {
        data: {
          isMerchantEmailUsable: { result },
        },
      } = await client.query<
        isMerchantEmailUsableType,
        isMerchantEmailUsableVariablesType
      >({
        query: isMerchantEmailUsable,
        variables: { email: value },
      });

      if (result === 'ALREADY_USED')
        throw new Error(t('account.email-has-been-used'));

      if (result === 'INVALID_FORMAT') throw new Error(t('account.error'));
    },
    [t, client],
  );
};
