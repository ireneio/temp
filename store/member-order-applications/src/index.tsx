// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';
import transformColor from 'color';
import moment from 'moment';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { Colors as ColorsContext } from '@meepshop/context';

import Application, { getApplicationStyles } from './Application';
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
  const colors = useContext(ColorsContext);
  const {
    query: { orderId },
  } = useRouter();

  const { data } = useQuery<
    getMemberOrderApplicationsType,
    getMemberOrderApplicationsVariablesType
  >(getMemberOrderApplications, {
    variables: { orderId: orderId as string },
  });

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  const orderNo = data.viewer?.order?.orderNo || null;
  const createdAt = data.viewer?.order?.createdAt || null;
  const applications = data.viewer?.order?.applications || [];

  return (
    <div className={styles.root}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .${
            styles.root
          } .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)  > td {
            background: ${transformColor(colors[4]).alpha(0.1)};
          }
          ${getApplicationStyles(colors)}
          `,
        }}
      />
      <div>
        <h1>
          <span>
            {t('order-no')}
            {orderNo}
          </span>

          <span>
            <span>{t('order-date')}</span>
            {moment(createdAt).format('YYYY/MM/DD')}
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
