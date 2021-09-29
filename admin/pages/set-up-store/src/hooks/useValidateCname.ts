// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  isStoreCnameUsable as isStoreCnameUsableType,
  isStoreCnameUsableVariables as isStoreCnameUsableVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { isStoreCnameUsable } from '../gqls/useValidateCname';

// definition
export default (): ((_: unknown, value: string) => void) => {
  const { t } = useTranslation('set-up-store');
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      const {
        data: {
          isStoreCnameUsable: { result },
        },
      } = await client.query<
        isStoreCnameUsableType,
        isStoreCnameUsableVariablesType
      >({
        query: isStoreCnameUsable,
        variables: { cname: value },
      });

      if (result === 'INVALID_FORMAT') throw new Error(t('cname.error'));

      if (result !== 'OK') throw new Error(t('cname.cname-has-been-used'));
    },
    [t, client],
  );
};
