// import
import React from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

import styles from '../styles/useStopAffiliateFeatureSubscription.less';
import useStopSubscription from './useStopSubscription';

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
  const [mutation] = useMutation<stopAffiliateFeatureSubscriptionType>(
    stopAffiliateFeatureSubscription,
    {
      update: (cache, { data }) => {
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
      },
    },
  );

  return useStopSubscription({
    title: t('affiliate.stop.title'),
    content: expirationDate => (
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
    submit: async () => {
      const { data } = await mutation();

      return data?.stopAffiliateFeatureSubscription.__typename === 'OkResponse';
    },
  });
};
