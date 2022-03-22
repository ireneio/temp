// typescript import
import { DataProxy } from '@apollo/client';

// import
import React, { useMemo, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { endOfMonth, addDays, format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsGeniusBye_w120_h120 as adminSettingAppsGeniusBye } from '@meepshop/images';
import { WarningFlatIcon } from '@meepshop/icons';

import styles from '../styles/useStopAffiliateFeatureSubscription.less';
import useSuccess from './useSuccess';

// graphql typescript
import {
  stopAffiliateFeatureSubscription as stopAffiliateFeatureSubscriptionType,
  useStopAffiliateFeatureSubscriptionFragment as useStopAffiliateFeatureSubscriptionFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { stopAffiliateFeatureSubscription } from '../gqls/useStopAffiliateFeatureSubscription';
import { useStopAffiliateFeatureSubscriptionFragment } from '../gqls/useStopAffiliateFeatureSubscription';

// definition
export default (storeId: string | null): (() => void) => {
  const { t } = useTranslation('setting-apps');
  const expirationDate = useMemo(
    () => format(addDays(endOfMonth(new Date()), 1), 'yyyy/MM/dd'),
    [],
  );
  const success = useSuccess();
  const [mutation] = useMutation<stopAffiliateFeatureSubscriptionType>(
    stopAffiliateFeatureSubscription,
    {
      update: (cache: DataProxy, { data }) => {
        if (
          !storeId ||
          data?.stopAffiliateFeatureSubscription.__typename !== 'OkResponse'
        )
          return;

        cache.writeFragment<useStopAffiliateFeatureSubscriptionFragmentType>({
          id: storeId,
          fragment: useStopAffiliateFeatureSubscriptionFragment,
          fragmentName: 'useStopAffiliateFeatureSubscriptionFragment',
          data: {
            __typename: 'Store',
            id: storeId,
            featureSubscription: {
              __typename: 'StoreFeatureSubscription',
              affiliateFeatureSubscription: {
                __typename: 'AffiliateFeatureSubscription',
                status: 'SUBSCRIBE_CANCELLING' as FeatureSubscriptionStatusEnumType,
              },
            },
          },
        });
        success({
          image: adminSettingAppsGeniusBye,
          title: t('affiliate.stop.success.title'),
          content: (
            <>
              {t('affiliate.stop.success.content.0')}

              <span> {expirationDate} </span>

              {t('affiliate.stop.success.content.1')}
            </>
          ),
          className: styles.success,
          okButtonProps: {
            type: 'text',
          },
          okText: t('affiliate.stop.success.go-back'),
        });
      },
    },
  );

  return useCallback(() => {
    Modal.confirm({
      width: '100%',
      className: styles.root,
      title: (
        <>
          <WarningFlatIcon />

          <div>{t('affiliate.stop.title')}</div>
        </>
      ),
      icon: null,
      content: (
        <>
          <div>
            {t('affiliate.stop.content.0')}

            <span className={styles.expirationDate}> {expirationDate} </span>

            {t('affiliate.stop.content.1')}
          </div>

          <div>
            {t('affiliate.stop.content.2')}

            <span className={styles.hightline}>
              {t('affiliate.stop.content.3')}
            </span>

            {t('affiliate.stop.content.4')}
          </div>

          <div className={styles.warn}>{t('affiliate.stop.warn')}</div>
        </>
      ),
      okButtonProps: {
        type: 'default',
      },
      okText: t('affiliate.stop.ok'),
      cancelButtonProps: {
        type: 'text',
      },
      cancelText: t('affiliate.stop.cancel'),
      onCancel: mutation,
    });
  }, [t, expirationDate, mutation]);
};
