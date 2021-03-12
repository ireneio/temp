// import
import React from 'react';
import Head from 'next/head';

import { useTranslation } from '@meepshop/locales';

import Ship from './Ship.svg';
import './styles/serverError.less';

// definition
export default () => {
  const { t } = useTranslation('common');

  return (
    <div className="server_error_root">
      <Head>
        <title>API error</title>
      </Head>
      <div className="server_error_row">
        <Ship />
        <div className="server_error_text_section">
          <div className="server_error_title">{t('api-error.title')}</div>
          <div className="server_error_message">{t('api-error.message')}</div>
          <div className="server_error_message">
            Please try again in a few minutes.
          </div>
        </div>
      </div>
    </div>
  );
};
