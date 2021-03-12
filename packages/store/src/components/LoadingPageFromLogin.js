import React from 'react';

import { useTranslation } from '@meepshop/locales';

export default React.memo(() => {
  const { t } = useTranslation('spinner');

  return <div className="loading_page_from_login">{t('login-request')}</div>;
});
