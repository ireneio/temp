// typescript import
import { FormItemProps } from 'antd/lib/form';

import { ValuesType } from '../types';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { useValidatorFragment as useValidatorFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (
  routingRules: useValidatorFragmentType['routingRules'],
  editId: string | undefined,
): {
  validateFromPath: (_: unknown, value: string) => void;
  validateToPath: NonNullable<FormItemProps<ValuesType>['rules']>[number];
} => {
  const { t } = useTranslation('redirects');

  return {
    validateFromPath: useCallback(
      async (_, value) => {
        // 500字限制: 網址至多輸入 500 字
        if (value.length > 500) throw new Error(t('FAIL_MALFORMED_URL'));

        const fromPathFound = routingRules.some(
          item => item.id !== editId && item.fromPath === value,
        );
        const toPathFound = routingRules.some(
          item => item.id !== editId && item.toPath === value,
        );

        // from已被設置過: 此網址已重新導向
        if (fromPathFound) throw new Error(t('FAIL_FROM_PATH_ALREADY_EXISTS'));

        // 此from已被設置成to: 網址已被指定為重新導向網址
        if (toPathFound) throw new Error(t('FAIL_FROM_PATH'));
      },
      [t, routingRules, editId],
    ),
    validateToPath: useCallback(
      ({ getFieldValue }) => ({
        validator: async (_: unknown, value: string) => {
          // 500字限制: 網址至多輸入 500 字
          if (value.length > 500) throw new Error(t('FAIL_MALFORMED_URL'));

          // from跟to相同: 無法導向相同網址
          if (value === getFieldValue(['fromPath']))
            throw new Error(t('FAIL_FROM_PATH_EQUALS_TO_PATH'));

          const fromPathFound = routingRules.some(
            item => item.fromPath === value,
          );

          // 此to已被設置為from了: 網址已被指定為原網址
          if (fromPathFound) throw new Error(t('FAIL_TO_PATH'));
        },
      }),
      [t, routingRules],
    ),
  };
};
