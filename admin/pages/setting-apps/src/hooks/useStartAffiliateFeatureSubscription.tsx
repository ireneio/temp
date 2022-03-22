// typescript import
import { DataProxy } from '@apollo/client';

// import
import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal, Button } from 'antd';
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import {
  adminSettingAppsAffiliate_w64_h64 as adminSettingAppsAffiliate,
  adminSettingAppsGeniusCongratulations_w120_h120 as adminSettingAppsGeniusCongratulations,
} from '@meepshop/images';
import Link from '@meepshop/link';

import styles from '../styles/useStartAffiliateFeatureSubscription.less';
import useSuccess from './useSuccess';

// graphql typescript
import {
  startAffiliateFeatureSubscription as startAffiliateFeatureSubscriptionType,
  startAffiliateFeatureSubscriptionVariables as startAffiliateFeatureSubscriptionVariablesType,
  useStartAffiliateFeatureSubscriptionFragment as useStartAffiliateFeatureSubscriptionFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { startAffiliateFeatureSubscription } from '../gqls/useStartAffiliateFeatureSubscription';
import { useStartAffiliateFeatureSubscriptionFragment } from '../gqls/useStartAffiliateFeatureSubscription';

// definition
export default (storeId: string | null, isRenew: boolean): (() => void) => {
  const { t } = useTranslation('setting-apps');
  const success = useSuccess();
  const [mutation] = useMutation<
    startAffiliateFeatureSubscriptionType,
    startAffiliateFeatureSubscriptionVariablesType
  >(startAffiliateFeatureSubscription, {
    update: (cache: DataProxy, { data }) => {
      if (
        !storeId ||
        (data?.startAffiliateFeatureSubscription.__typename !== 'OkResponse' &&
          data?.renewAffiliateFeatureSubscription.__typename !== 'OkResponse')
      )
        return;

      cache.writeFragment<useStartAffiliateFeatureSubscriptionFragmentType>({
        id: storeId,
        fragment: useStartAffiliateFeatureSubscriptionFragment,
        fragmentName: 'useStartAffiliateFeatureSubscriptionFragment',
        data: {
          __typename: 'Store',
          id: storeId,
          featureSubscription: {
            __typename: 'StoreFeatureSubscription',
            affiliateFeatureSubscription: {
              __typename: 'AffiliateFeatureSubscription',
              status: 'SUBSCRIBE_CONTINUING' as FeatureSubscriptionStatusEnumType,
            },
          },
        },
      });
      success({
        image: adminSettingAppsGeniusCongratulations,
        title: t('affiliate.start.success.title'),
        content: (
          <>
            {t('affiliate.start.success.content')}

            <Link href="/affiliate/programs">
              <Button type="primary">
                {t('affiliate.start.success.start')}
              </Button>
            </Link>
          </>
        ),
        className: styles.success,
        okButtonProps: {
          type: 'text',
        },
        okText: t('affiliate.start.success.go-back'),
      });
    },
  });

  return useCallback(() => {
    Modal.confirm({
      width: '100%',
      className: styles.root,
      title: t('affiliate.start.title'),
      icon: null,
      content: (
        <>
          <div className={styles.content}>
            <img src={adminSettingAppsAffiliate} alt="affiliate" />

            <div>
              <div className={styles.title}>
                {t('affiliate.start.subTitle')}
              </div>

              {t('affiliate.start.content')}
            </div>

            <div>
              <div className={styles.price}>USD 16.9</div>

              <div className={styles.title}>
                USD 9.9
                <span>/月</span>
              </div>

              {t('affiliate.start.price')}
            </div>
          </div>

          <div className={styles.featureTitle}>
            {t('affiliate.start.feature.title')}
          </div>

          {[0, 1, 2].map(key => (
            <div key={key} className={styles.feature}>
              <CheckOutlined />

              {t(`affiliate.start.feature.${key}`)}
            </div>
          ))}

          <div className={styles.warn}>
            <InfoCircleOutlined />

            {t('affiliate.start.warn')}
          </div>
        </>
      ),
      okText: t('affiliate.start.ok'),
      onOk: () =>
        mutation({
          variables: {
            isRenew,
          },
        }),
      cancelText: t('affiliate.start.cancel'),
    });
  }, [isRenew, t, mutation]);
};
