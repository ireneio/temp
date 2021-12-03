// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import Application from './Application';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderApplications as getMemberOrderApplicationsType,
  getMemberOrderApplicationsVariables as getMemberOrderApplicationsVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getMemberOrderApplications } from './gqls';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const { t } = useTranslation('member-order-applications');
  const {
    query: { orderId },
  } = useRouter();

  const { data } = useQuery<
    getMemberOrderApplicationsType,
    getMemberOrderApplicationsVariablesType
  >(getMemberOrderApplications, {
    variables: { orderId: orderId as string },
  });

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  const orderNo = data.viewer?.order?.orderNo || null;
  const createdAt = data.viewer?.order?.createdAt || null;
  const applications = data.viewer?.order?.applications || [];

  return (
    <div className={styles.root}>
      <div>
        <h1>
          <span>
            {t('order-no')}
            {orderNo}
          </span>

          <span>
            <span>{t('order-date')}</span>
            {format(new Date(createdAt || new Date()), 'yyyy/MM/dd')}
          </span>
        </h1>

        {applications.map(app => (
          <Application
            // SHOULD_NOT_BE_NULL
            key={app.id || 'null id'}
            data={app}
          />
        ))}
      </div>
    </div>
  );
});
