// typescript import
import { FormListProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('upselling-products');

  return useCallback(
    (_, value) => {
      if (!value?.[0]) throw new Error(t('hasUnlimitedDuration.error'));
    },
    [t],
  );
};
