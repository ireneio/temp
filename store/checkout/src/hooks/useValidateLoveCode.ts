// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

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
  const [validate, { data }] = useLazyQuery<
    isEInvoiceLoveCodeValidType,
    isEInvoiceLoveCodeValidVariablesType
  >(isEInvoiceLoveCodeValid);

  return useCallback(
    async (_, value) => {
      validate({ variables: { loveCode: value } });

      if (!data?.isEInvoiceLoveCodeValid)
        throw new Error(t('wrong-donate-code'));
    },
    [t, validate, data],
  );
};
