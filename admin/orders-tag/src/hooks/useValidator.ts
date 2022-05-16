// typescript import
import { FormListProps } from 'antd/lib/form';

import { TagType } from '../constants';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (
  tags: TagType[],
): NonNullable<FormListProps['rules']>[number]['validator'] => {
  const { t } = useTranslation('orders-tag');

  return useCallback(
    async (_, value: string) => {
      if (!value?.trim()) throw new Error(t('tag-no-blank'));

      if (value?.length > 40) throw new Error(t('tag-too-long'));

      if (tags.some(tag => tag.value === value))
        throw new Error(t('tag-exist-error'));
    },
    [t, tags],
  );
};
