// typescript import
import { languageType } from '../constants';

// import
import { useCallback } from 'react';

import { useTranslation } from '../index';

// graphql typescript
import { localeFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default (): ((locale?: localeFragment | null) => string) => {
  const { i18n } = useTranslation('common');

  return useCallback(
    locale =>
      locale?.[i18n.language.replace('-', '_') as languageType] ||
      locale?.zh_TW ||
      '',
    [i18n],
  );
};
