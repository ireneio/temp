// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  validatePartnerName as validatePartnerNameType,
  validatePartnerNameVariables as validatePartnerNameVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { validatePartnerName } from '../gqls/useValidatePartnerName';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('affiliate-partner');
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      if (!value) return;

      const { data } = await client.query<
        validatePartnerNameType,
        validatePartnerNameVariablesType
      >({
        query: validatePartnerName,
        variables: {
          partnerName: value,
        },
      });

      // SHOULD_NOT_BE_NULL
      if (data?.isAffiliatePartnerNameValid?.__typename !== 'OkResponse')
        throw new Error(t('validate.same-partner-name'));
    },
    [t, client],
  );
};
