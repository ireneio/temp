// typescript import
import { NextPage } from 'next';

import { languageType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Spin, Icon } from 'antd';

import { meepshopLogo } from '@meepshop/images';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import moment from 'moment';

import Samples from './Samples';
import Error from './Error';
import useSmartConversionModule from './hooks/useSmartConversionModule';
import styles from './styles/index.less';
import { MOMENT_FORMAT } from './constants';

// typescript definition
interface PropsType {
  pageId: string;
  namespacesRequired: string[];
}

// definition
const Chart = dynamic(() => import('./Chart'), { ssr: false });

const SmartConversionAnalysis: NextPage<PropsType> = React.memo(
  ({ pageId }: PropsType) => {
    const { query } = useRouter();
    const {
      t,
      i18n: { language },
    } = useTranslation('smart-conversion-analysis');
    const {
      loading,
      error,
      smartConversionModule,
      timezone,
    } = useSmartConversionModule({
      isEnd: query.end === 'true',
      pageId,
    });

    if (loading || error || !smartConversionModule)
      return <Spin indicator={<Icon type="loading" spin />} />;

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
    if (!lastGAUpdatedAt) return <Error />;

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
                <div>
                  {`${moment(startAt)
                    .utcOffset(timezone)
                    .format(MOMENT_FORMAT)} ~ ${moment(endAt)
                    .utcOffset(timezone)
                    .format(MOMENT_FORMAT)} ${t('day', {
                    days: durationDays,
                  })}`}
                </div>
              </div>

              {!isStatusEnd ? null : (
                <div>
                  <span>{t('ended-at')}</span>
                  <div>
                    {moment(actualEndAt)
                      .utcOffset(timezone)
                      .format(MOMENT_FORMAT)}
                  </div>
                </div>
              )}

              <div>
                <span>{t('updated-at')}</span>
                <div>
                  {moment(lastGAUpdatedAt)
                    .utcOffset(timezone)
                    .format(MOMENT_FORMAT)}
                  {!isStatusEnd ? null : (
                    <span>
                      <Icon type="history" />
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

SmartConversionAnalysis.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['smart-conversion-analysis'],
  pageId: query.pageId as string,
});

export default SmartConversionAnalysis;
