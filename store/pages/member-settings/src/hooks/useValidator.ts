// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { getUserInfo_viewer_birthday as getUserInfoViewerBirthday } from '@meepshop/types/gqls/store';

// typescript definition
type ValueType = string | number | null | getUserInfoViewerBirthday;
type RuleType = {
  rules?: {
    required: boolean;
    message: string;
  }[];
};

// definition
export default (): ((value: ValueType) => RuleType) => {
  const { t } = useTranslation('member-settings');

  return useCallback(
    (value: ValueType) =>
      !value
        ? {}
        : {
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
          },
    [t],
  );
};
