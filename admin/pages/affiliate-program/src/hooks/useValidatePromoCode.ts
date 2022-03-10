// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  validatePromoCode as validatePromoCodeType,
  validatePromoCodeVariables as validatePromoCodeVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { validatePromoCode } from '../gqls/useValidatePromoCode';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('affiliate-program');
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      if (!value) return;

      const { data } = await client.query<
        validatePromoCodeType,
        validatePromoCodeVariablesType
      >({
        query: validatePromoCode,
        variables: {
          promoCode: value,
        },
      });

      if (data?.isAffiliatePromoCodeValid.__typename !== 'OkResponse')
        throw new Error(t('validate.promo-code-exist'));
    },
    [t, client],
  );
};
