// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';
import Block from '@admin/block';

import styles from './styles/plan.less';

// graphql typescript
import { planFragment as planFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: planFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('account-setting');
  const getLanguage = useGetLanguage();

  const accountType = viewer?.store?.metaData?.accountType;
  const billingType = viewer?.store?.setting?.billing?.billingType;
  const planName = viewer?.store?.plan?.name;

  return (
    <Block
      title={t('plan.title')}
      description={
        <div>
          <div>{t('plan.description-1')}</div>
          <div>
            {`${t('plan.description-2')} `}
            <a
              className={styles.link}
              href="https://www.meepshop.com/terms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('plan.service')}
            </a>
            、
            <a
              className={styles.link}
              href="https://www.meepshop.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('plan.privacy')}
            </a>
          </div>
        </div>
      }
    >
      <div>
        {billingType !== 'CONTRACT' ? null : (
          <>
            <div className={styles.currentPlan}>{t('plan.current-plan')}</div>
            <div className={styles.plan}>
              {getLanguage(planName)}
              <span>{` /${t('plan.contract-plan')}`}</span>
            </div>
            <div className={styles.prompt}>{t('plan.contact-consultant')}</div>
          </>
        )}

        {billingType !== 'RECURRING' ? null : (
          <>
            <div className={styles.currentPlan}>{t('plan.current-plan')}</div>
            <div className={styles.plan}>
              {getLanguage(planName)}
              <span>{` /${t('plan.monthly-plan')}`}</span>
            </div>
          </>
        )}

        {billingType !== 'INTERNAL' ? null : (
          <>
            <div className={styles.currentPlan}>{t('plan.current-plan')}</div>
            <div className={styles.plan}>{t('plan.test-store')}</div>
          </>
        )}

        {accountType !== 'TRIAL' ? null : (
          <>
            <div className={styles.trial}>{t('plan.free-trial')}</div>

            <Link href="/account-setting/plan-setting">
              <Button type="primary">{t('plan.upgrade-plan')}</Button>
            </Link>
          </>
        )}
      </div>
    </Block>
  );
});
