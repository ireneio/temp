// typescript import
import { BraftEditorProps } from 'braft-editor';

// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// definition
export default (): BraftEditorProps['language'] => {
  const {
    i18n: { language },
  } = useTranslation();

  return useMemo(() => {
    switch (language) {
      case 'ja_JP':
        return 'jpn';
      case 'vi_VN':
        return 'vi-vn';
      case 'fr_FR':
        return 'fr';
      case 'en_US':
      case 'es_ES':
      case 'th_TH':
      case 'id_ID':
        return 'en';
      case 'zh_TW':
      default:
        return 'zh-hant';
    }
  }, [language]);
};
