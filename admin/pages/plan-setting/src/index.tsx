// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

import Plan from '@admin/plan';
import { useTranslation } from '@meepshop/locales';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const PlanSetting: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('plan-setting');

  return (
    <Plan
      backTo={{
        name: t('account-setting'),
        path: '/account-setting',
      }}
      title={t('full-feature-open')}
      description={t('appointment-consultation')}
    />
  );
});

PlanSetting.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default PlanSetting;
