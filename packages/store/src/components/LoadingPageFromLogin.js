import React from 'react';

import { useTranslation } from '@store/utils/lib/i18n';

export default React.memo(() => {
  const { t } = useTranslation('spinner');

  return <div className="loading_page_from_login">{t('login-request')}</div>;
});
