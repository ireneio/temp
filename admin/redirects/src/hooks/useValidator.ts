// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { useValidatorFragment as useValidatorFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (
  routingRules: useValidatorFragmentType['routingRules'],
  editId: string | undefined,
  fromPath: string | undefined,
): {
  validateFromPath: ValidationRule['validator'];
  validateToPath: ValidationRule['validator'];
} => {
  const { t } = useTranslation('redirects');

  return {
    validateFromPath: useCallback(
      (_, value, callback) => {
        // 500字限制: 網址至多輸入 500 字
        if (value.length > 500) return callback(t('FAIL_MALFORMED_URL'));

        const fromPathFound = routingRules.some(
          item => item.id !== editId && item.fromPath === value,
        );

        const toPathFound = routingRules.some(
          item => item.id !== editId && item.toPath === value,
        );

        // from已被設置過: 此網址已重新導向
        if (fromPathFound) return callback(t('FAIL_FROM_PATH_ALREADY_EXISTS'));

        // 此from已被設置成to: 網址已被指定為重新導向網址
        if (toPathFound) return callback(t('FAIL_FROM_PATH'));

        return callback();
      },
      [t, routingRules, editId],
    ),
    validateToPath: useCallback(
      (_, value, callback) => {
        // 500字限制: 網址至多輸入 500 字
        if (value.length > 500) return callback(t('FAIL_MALFORMED_URL'));

        // from跟to相同: 無法導向相同網址
        if (value === fromPath)
          return callback(t('FAIL_FROM_PATH_EQUALS_TO_PATH'));

        const fromPathFound = routingRules.some(
          item => item.fromPath === value,
        );

        // 此to已被設置為from了: 網址已被指定為原網址
        if (fromPathFound) return callback(t('FAIL_TO_PATH'));

        return callback();
      },
      [t, routingRules, fromPath],
    ),
  };
};
