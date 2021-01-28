// import
import React from 'react';
import Head from 'next/head';

import { pageNotFound_w635 as pageNotFound } from '@meepshop/images';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import './styles/index.less';

// definition
export default () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>404 Page not found</title>
      </Head>

      <div className="error_page_not_found_root">
        <img
          className="error_page_not_found_img"
          src={pageNotFound}
          alt="oops"
        />
        <div className="error_page_not_found_title">
          {t('page-not-found.title')}
        </div>
        <div className="error_page_not_found_message">
          {t('page-not-found.message')}
        </div>
        <div className="error_page_not_found_message">
          Oops! Page not found.
        </div>
        <a href="/">
          <div className="error_page_not_found_button">
            {t('back-to-homepage')}
          </div>
        </a>
      </div>
    </>
  );
};
