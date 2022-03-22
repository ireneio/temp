// import
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { addDays, endOfMonth, format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import { adminSettingAppsAffiliate_w90_h90 as adminSettingAppsAffiliate } from '@meepshop/images';

import styles from './styles/affiliate.less';
import useStartAffiliateFeatureSubscription from './hooks/useStartAffiliateFeatureSubscription';
import useStopAffiliateFeatureSubscription from './hooks/useStopAffiliateFeatureSubscription';

// graphql typescript
import { affiliateFragment as affiliateFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: affiliateFragmentType | null;
}

// definition
export default React.memo(({ store }: PropsType) => {
  const { t } = useTranslation('setting-apps');
  const status =
    store?.featureSubscription.affiliateFeatureSubscription.status ||
    'NOT_SUBSCRIBED';
  const expirationDate = useMemo(
    () => format(addDays(endOfMonth(new Date()), 1), 'yyyy/MM/dd'),
    [],
  );
  const startAffiliateFeatureSubscription = useStartAffiliateFeatureSubscription(
    store?.id || null,
    status !== 'NOT_SUBSCRIBED',
  );
  const stopAffiliateFeatureSubscription = useStopAffiliateFeatureSubscription(
    store?.id || null,
  );

  return (
    <div className={styles.root}>
      <img src={adminSettingAppsAffiliate} alt="affiliate" />

      <div className={styles.content}>
        <div className={styles.title}>{t('affiliate.title')}</div>

        <div className={styles.desc}>
          {t('affiliate.desc')}

          <Link href="#test" target="_blank">
            <a href="#test" target="_blank">
              {t('affiliate.instruction')}
            </a>
          </Link>
        </div>

        <Button
          type={status === 'SUBSCRIBE_CONTINUING' ? 'default' : 'primary'}
          onClick={
            status !== 'SUBSCRIBE_CONTINUING'
              ? startAffiliateFeatureSubscription
              : stopAffiliateFeatureSubscription
          }
        >
          {t(`affiliate.button.${status}`)}
        </Button>

        {status !== 'SUBSCRIBE_CANCELLING' ? null : (
          <span className={styles.expirationDate}>
            <InfoCircleOutlined />

            {t('affiliate.expiration-date', {
              expirationDate,
            })}
          </span>
        )}
      </div>

      <div className={`${styles.price} ${styles[status]}`}>
        <div>USD 9.9 /月</div>

        {status !== 'NOT_SUBSCRIBED' ? (
          <span>{t(`affiliate.status.${status}`)}</span>
        ) : (
          <div>USD 16.9</div>
        )}
      </div>
    </div>
  );
});
