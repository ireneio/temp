// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Form, Button } from 'antd';
import { filter } from 'graphql-anywhere';
import { areEqual } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

import Account from './Account';
import Plan from './Plan';
import useInitialValues from './hooks/useInitialValues';
import useUpdateAccountSetting from './hooks/useUpdateAccountSetting';
import styles from './styles/index.less';

// graphql typescript
import { getMerchantAccount as getMerchantAccountType } from '@meepshop/types/gqls/admin';

// graphql import
import { getMerchantAccount } from './gqls';
import { useInitialValuesUserFragment } from './gqls/useInitialValues';
import { accountFragment } from './gqls/account';
import { planFragment } from './gqls/plan';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const AccountSetting: NextPage<PropsType> = React.memo(() => {
  const { data } = useQuery<getMerchantAccountType>(getMerchantAccount);
  const { t } = useTranslation('account-setting');
  const [form] = Form.useForm();
  const initialValues = useInitialValues(
    form,
    filter(useInitialValuesUserFragment, data?.viewer || null),
  );
  const { loading, updateAccountSetting } = useUpdateAccountSetting(
    initialValues,
    data?.viewer?.id || null,
  );

  return (
    <Form
      className={styles.root}
      form={form}
      initialValues={initialValues}
      onFinish={updateAccountSetting}
    >
      <Header
        title={t('title')}
        buttons={
          <FormItem shouldUpdate noStyle>
            {({ getFieldsValue, resetFields, submit }) =>
              areEqual(initialValues, getFieldsValue()) ? null : (
                <div>
                  <Button onClick={() => resetFields()}>{t('cancel')}</Button>

                  <Button loading={loading} onClick={submit} type="primary">
                    {t('save')}
                  </Button>
                </div>
              )
            }
          </FormItem>
        }
      >
        <div className={styles.form}>
          <Account viewer={filter(accountFragment, data?.viewer || null)} />

          <Plan viewer={filter(planFragment, data?.viewer || null)} />
        </div>
      </Header>
    </Form>
  );
});

AccountSetting.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default AccountSetting;
