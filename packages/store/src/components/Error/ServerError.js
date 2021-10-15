// import
import React from 'react';
import Head from 'next/head';

import { useTranslation } from '@meepshop/locales';

import Ship from './Ship.svg';
import './styles/serverError.less';

// definition
export default () => {
  const { t } = useTranslation('apollo');

  return (
    <div className="server_error_root">
      <Head>
        <title>Server error</title>
      </Head>
      <div className="server_error_row">
        <Ship />
        <div className="server_error_text_section">
          <div className="server_error_title">{t('server-error.title')}</div>
          <div className="server_error_message">
            {t('server-error.message')}
          </div>
          <div className="server_error_message">
            Oops! Something went wrong.
          </div>
        </div>
      </div>
    </div>
  );
};
