// typescript import
import { FormListProps } from 'antd/lib/form';
import { EditorState } from 'braft-editor';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('setting-shopping');

  return useCallback(
    async (_, value: EditorState) => {
      if (value?.toText().replace(/\n/g, '').length > 200)
        throw new Error(t('setting.shopperLoginMessageEnabled.error'));
    },
    [t],
  );
};
