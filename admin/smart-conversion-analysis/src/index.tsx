// typescript import
import { NextPage } from 'next';

// import
import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';

import { meepshopLogo } from '@meepshop/images';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import moment from 'moment';

import Samples from './Samples';
import Error from './Error';
import styles from './styles/index.less';
import mutation from './gqls';
import { MOMENT_FORMAT } from './constants';

// graphql typescript
import {
  fetchSmartConversionModuleGAData,
  fetchSmartConversionModuleGADataVariables,
} from './gqls/__generated__/fetchSmartConversionModuleGAData';

// typescript definition
interface PropsType {
  pageId: string;
}

// definition
const Chart = dynamic(() => import('./Chart'), { ssr: false });

const SmartConversionAnalysis: NextPage = React.memo(
  ({ pageId }: PropsType) => {
    const { t } = useTranslation('smart-conversion-analysis');
    const [fetchData, { data, loading, error }] = useMutation<
      fetchSmartConversionModuleGAData,
      fetchSmartConversionModuleGADataVariables
    >(mutation);

    useEffect(() => {
      fetchData({ variables: { pageId } });
    }, [fetchData, pageId]);

    if (loading) return <Spin indicator={<Icon type="loading" spin />} />;

    if (
      error ||
      !data?.fetchSmartConversionModuleGAData.smartConversionModule ||
      data.fetchSmartConversionModuleGAData.status !== 'OK'
    )
      return <Error />;

    const {
      pageTitle,
      status,
      startAt,
      endAt,
      durationDays,
      actualEndAt,
      lastGAUpdatedAt,
      samples,
    } = data.fetchSmartConversionModuleGAData.smartConversionModule;
    const isEnd = status === 'END';

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
                  {`${moment(startAt).format(MOMENT_FORMAT)} ~ ${moment(
                    endAt,
                  ).format(MOMENT_FORMAT)} ${t('day', { days: durationDays })}`}
                </div>
              </div>

              {!isEnd ? null : (
                <div>
                  <span>{t('ended-at')}</span>
                  <div>{moment(actualEndAt).format(MOMENT_FORMAT)}</div>
                </div>
              )}

              <div>
                <span>{t('updated-at')}</span>
                <div>
                  {moment(lastGAUpdatedAt).format(MOMENT_FORMAT)}
                  {!isEnd ? null : (
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
  pageId: query.pageId,
});

export default SmartConversionAnalysis;
