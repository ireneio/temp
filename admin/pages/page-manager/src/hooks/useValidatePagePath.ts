// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  checkIfPageExistsBeforeCreatingPage as checkIfPageExistsBeforeCreatingPageType,
  checkIfPageExistsBeforeCreatingPageVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { checkIfPageExistsBeforeCreatingPage } from '../gqls/useValidatePagePath';

// definition
export default (
  initialValue?: string | null,
): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('page-manager');
  const client = useApolloClient();

  return useCallback(
    async (_, value) => {
      if (!value || (initialValue && initialValue === value)) return;

      const { data } = await client.query<
        checkIfPageExistsBeforeCreatingPageType,
        checkIfPageExistsBeforeCreatingPageVariables
      >({
        query: checkIfPageExistsBeforeCreatingPage,
        variables: {
          input: value,
        },
      });

      if (data?.isPagePathExists) throw new Error(t('form.same-path'));
    },
    [initialValue, t, client],
  );
};
