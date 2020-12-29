// typescript import
import { languageType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Link from '@meepshop/link';
import Block from '@admin/block';

import styles from './styles/plan.less';

// graphql typescript
import { getMerchantAccount_viewer as getMerchantAccountViewer } from './gqls/__generated__/getMerchantAccount';

// typescript definition
interface PropsType {
  viewer: getMerchantAccountViewer | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t, i18n } = useTranslation('account-setting');

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
              {planName?.[i18n.language as languageType] || planName?.zh_TW}
              <span>{` /${t('plan.contract-plan')}`}</span>
            </div>
            <div className={styles.prompt}>{t('plan.contact-consultant')}</div>
          </>
        )}

        {billingType !== 'RECURRING' ? null : (
          <>
            <div className={styles.currentPlan}>{t('plan.current-plan')}</div>
            <div className={styles.plan}>
              {planName?.[i18n.language as languageType] || planName?.zh_TW}
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
