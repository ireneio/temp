// typescript import
import { NextPage } from 'next';

import { languageType } from '@meepshop/locales';

// import
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { HistoryOutlined } from '@ant-design/icons';

import { meepshopLogo } from '@meepshop/images';
import { useTranslation } from '@meepshop/locales';

import NoData from './NoData';
import Loading from './Loading';
import Samples from './Samples';
import useSmartConversionModule from './hooks/useSmartConversionModule';
import styles from './styles/index.less';
import formatDate from './utils/formatDate';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: boolean;
  pageId: string;
}

// definition
const Chart = dynamic(() => import('./Chart'), { ssr: false });

const SmartConversionAnalysis: NextPage<PropsType> = React.memo(
  ({ pageId }: PropsType) => {
    const {
      t,
      i18n: { language },
    } = useTranslation('smart-conversion-analysis');
    const {
      loading,
      error,
      isServiceUndone,
      smartConversionModule,
      timezone,
    } = useSmartConversionModule({
      pageId,
    });

    if (loading || error || !smartConversionModule || isServiceUndone)
      return <Loading />;

    const {
      page,
      status,
      startAt,
      endAt,
      durationDays,
      actualEndAt,
      lastGAUpdatedAt,
      samples,
    } = smartConversionModule;

    // 未曾自 GA 取得數據 lastGAUpdatedAt 會等於 null
    if (!lastGAUpdatedAt) return <NoData />;

    const isStatusEnd = status === 'END';
    const pageTitle =
      page.title?.[language as languageType] || page.title?.zh_TW;

    return (
      <>
        <Head>
          <title>{`${pageTitle} - ${t('title')}`}</title>
        </Head>
        <div className={styles.root}>
          <div>
            <h1>
              <img src={meepshopLogo} alt="meepshop" />
              {`meepShop ${t('smart-conversion')}${t('title')}`}
              <span className={styles[status]}>{t(`status.${status}`)}</span>
            </h1>

            <div className={styles.table}>
              <div>
                <span>{t('page-title')}</span>
                <div>{pageTitle}</div>
              </div>

              <div>
                <span>{t('period')}</span>
                <div>{`${formatDate(startAt, timezone)} ~ ${formatDate(
                  endAt,
                  timezone,
                )} ${t('day', {
                  days: durationDays,
                })}`}</div>
              </div>

              {!isStatusEnd ? null : (
                <div>
                  <span>{t('ended-at')}</span>
                  <div>{formatDate(actualEndAt || new Date(), timezone)}</div>
                </div>
              )}

              <div>
                <span>{t('updated-at')}</span>
                <div>
                  {formatDate(lastGAUpdatedAt, timezone)}
                  {!isStatusEnd ? null : (
                    <span>
                      <HistoryOutlined />
                      {t('stop-updating')}
                    </span>
                  )}
                </div>
              </div>

              <Samples samples={samples} />

              <Chart samples={samples} />
            </div>
          </div>
        </div>
      </>
    );
  },
);

SmartConversionAnalysis.getInitialProps = async ({ query: { pageId } }) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof pageId !== 'string')
    throw new Error('[FIXME] pageId is undefined');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    noWrapper: true,
    pageId,
  };
};

export default SmartConversionAnalysis;
