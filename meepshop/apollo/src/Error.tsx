// import
import React from 'react';
import Head from 'next/head';

import { useTranslation } from '@meepshop/locales';
import {
  pageErrorStars,
  pageErrorSmoke,
  pageErrorShip,
} from '@meepshop/images';

import styles from './styles/error.less';

// definition
export default React.memo(
  ({
    title,
    loggerInfoId,
    children,
  }: {
    title: string;
    loggerInfoId: string;
    children?: React.ReactNode;
  }) => {
    const { t } = useTranslation('apollo');

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <div className={styles.root}>
          <div className={styles.image}>
            <img src={pageErrorStars} alt="stars" />
            <img src={pageErrorSmoke} alt="smoke" />
            <img src={pageErrorShip} alt="ship" />
          </div>

          <div className={styles.message}>
            {children}

            <div className={styles.errorId}>
              <p>{t('copy')}</p>
              <div className={styles.id}>{loggerInfoId}</div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
