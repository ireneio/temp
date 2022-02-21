// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  isBANValid as isBANValidType,
  isBANValidVariables as isBANValidVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { isBANValid } from '../gqls/useValidateInvoiceVAT';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('checkout');
  const [validate, { data }] = useLazyQuery<
    isBANValidType,
    isBANValidVariablesType
  >(isBANValid);

  return useCallback(
    async (_, value) => {
      validate({ variables: { ban: value } });

      if (!data?.isBANValid) throw new Error(t('wrong-invoice-number'));
    },
    [t, validate, data],
  );
};
