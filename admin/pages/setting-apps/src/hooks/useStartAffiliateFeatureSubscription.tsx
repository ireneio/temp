// import
import React from 'react';
import { useMutation } from '@apollo/client';
import { CheckOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsAffiliate_w64_h64 as adminSettingAppsAffiliate } from '@meepshop/images';

import styles from '../styles/useStartAffiliateFeatureSubscription.less';
import useStartSubscription from './useStartSubscription';

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
  const [mutation] = useMutation<
    startAffiliateFeatureSubscriptionType,
    startAffiliateFeatureSubscriptionVariablesType
  >(startAffiliateFeatureSubscription, {
    update: (cache, { data }) => {
      if (
        !storeId ||
        (data?.startAffiliateFeatureSubscription?.__typename !== 'OkResponse' &&
          data?.renewAffiliateFeatureSubscription?.__typename !== 'OkResponse')
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
    },
  });

  return useStartSubscription({
    content: (
      <>
        <div className={styles.root}>
          <img src={adminSettingAppsAffiliate} alt="affiliate" />

          <div>
            <div className={styles.title}>{t('affiliate.start.title')}</div>

            {t('affiliate.start.content')}
          </div>

          <div>
            <div className={styles.originalPrice}>USD 16.9</div>

            <div className={styles.price}>
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
      </>
    ),
    submit: async () => {
      const { data } = await mutation({
        variables: {
          isRenew,
        },
      });

      return (
        data?.startAffiliateFeatureSubscription?.__typename === 'OkResponse' ||
        data?.renewAffiliateFeatureSubscription?.__typename === 'OkResponse'
      );
    },
    successTitle: t('affiliate.start.success.title'),
    successLink: '/affiliate/programs',
  });
};
