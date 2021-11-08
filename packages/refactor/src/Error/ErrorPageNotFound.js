// import
import React from 'react';
import Head from 'next/head';

import { pageNotFound_w635 as pageNotFound } from '@meepshop/images';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/index.less';

// definition
export default () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>404 Page not found</title>
      </Head>

      <div className={styles.root}>
        <img className={styles.img} src={pageNotFound} alt="oops" />
        <div className={styles.title}>{t('page-not-found.title')}</div>
        <div className={styles.message}>{t('page-not-found.message')}</div>
        <div className={styles.message}>Oops! Page not found.</div>
        <a href="/">
          <div className={styles.button}>{t('back-to-homepage')}</div>
        </a>
      </div>
    </>
  );
};
