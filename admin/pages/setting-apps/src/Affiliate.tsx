// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsAffiliate_w90_h90 as adminSettingAppsAffiliate } from '@meepshop/images';

import Subscription from './Subscription';
import ExpirationDate from './ExpirationDate';
import styles from './styles/affiliate.less';
import useStartAffiliateFeatureSubscription from './hooks/useStartAffiliateFeatureSubscription';
import useStopAffiliateFeatureSubscription from './hooks/useStopAffiliateFeatureSubscription';

// graphql typescript
import {
  affiliateFragment as affiliateFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: affiliateFragmentType | null;
}

// definition
export default React.memo(({ store }: PropsType) => {
  const { t } = useTranslation('setting-apps');
  const status =
    store?.featureSubscription.affiliateFeatureSubscription.status ||
    ('NOT_SUBSCRIBED' as FeatureSubscriptionStatusEnumType);
  const startAffiliateFeatureSubscription = useStartAffiliateFeatureSubscription(
    store?.id || null,
    status !== 'NOT_SUBSCRIBED',
  );
  const stopAffiliateFeatureSubscription = useStopAffiliateFeatureSubscription(
    store?.id || null,
  );

  return (
    <Subscription
      img={adminSettingAppsAffiliate}
      status={status}
      price={
        status !== 'NOT_SUBSCRIBED' ? (
          'USD 9.9 /月'
        ) : (
          <>
            USD 9.9 /月
            <div className={styles.originalPrice}>USD 16.9</div>
          </>
        )
      }
      link="https://supportmeepshop.com/knowledgebase/%e5%88%86%e6%bd%a4%e5%8a%9f%e8%83%bd/"
      name="affiliate"
    >
      <Button
        type={status === 'SUBSCRIBE_CONTINUING' ? 'default' : 'primary'}
        onClick={
          status !== 'SUBSCRIBE_CONTINUING'
            ? startAffiliateFeatureSubscription
            : stopAffiliateFeatureSubscription
        }
      >
        {t(`button.${status}`)}
      </Button>

      {status !== 'SUBSCRIBE_CANCELLING' ? null : <ExpirationDate />}
    </Subscription>
  );
});
