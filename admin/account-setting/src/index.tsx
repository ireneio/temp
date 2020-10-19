// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Form, Button, Divider } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Header from '@admin/header';

import Account from './Account';
import Plan from './Plan';
import useSave from './hooks/useSave';
import styles from './styles/index.less';

// graphql typescript
import { getMerchantAccount } from './__generated__/getMerchantAccount';

// graphql import
import { accountFragment } from './Account';
import { planFragment } from './Plan';

// definition
const query = gql`
  query getMerchantAccount {
    viewer {
      id
      ...accountFragment
      ...planFragment
    }
  }

  ${accountFragment}
  ${planFragment}
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const AccountSetting: NextPage = Form.create<FormComponentProps>()(
  React.memo(({ form }: FormComponentProps) => {
    const { resetFields, isFieldsTouched } = form;
    const { data } = useQuery<getMerchantAccount>(query);
    const { t } = useTranslation('account-setting');
    const { loading, save } = useSave(form, data?.viewer?.id || null);

    return (
      <Header
        title={t('title')}
        buttons={
          !isFieldsTouched() ? null : (
            <div>
              <Button onClick={() => resetFields()}>{t('cancel')}</Button>

              <Button onClick={save} type="primary" loading={loading}>
                {t('save')}
              </Button>
            </div>
          )
        }
      >
        <div className={styles.root}>
          <Account form={form} viewer={data?.viewer || null} />

          <Divider className={styles.divider} />

          <Plan viewer={data?.viewer || null} />
        </div>
      </Header>
    );
  }),
);

AccountSetting.getInitialProps = async () => ({
  namespacesRequired: ['account-setting'],
});

export default AccountSetting;
