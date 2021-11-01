// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Form, Button } from 'antd';
import { areEqual } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

// Use to copy mixin.less
import './styles/mixin.less';

import Basic from './Basic';
import Checkout from './Checkout';
import CheckoutUserInfo from './CheckoutUserInfo';
import Invoice from './Invoice';
import Order from './Order';
import Advanced from './Advanced';
import Accessibility from './Accessibility';
import useUpdateShoppingSetting from './hooks/useUpdateShoppingSetting';
import useShoppingInitialValues from './hooks/useShoppingInitialValues';
import styles from './styles/index.less';

// graphql typescript
import { getShoppingSetting as getShoppingSettingType } from '@meepshop/types/gqls/admin';

// graphql import
import { getShoppingSetting } from './gqls';
import { updateShoppingSettingFragment } from './gqls/useUpdateStoreList';
import { useShoppingInitialValuesFragment } from './gqls/useShoppingInitialValues';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;

const SettingShopping: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const [form] = Form.useForm();
    const { t } = useTranslation('setting-shopping');
    const { data } = useQuery<getShoppingSettingType>(getShoppingSetting);
    const initialValues = useShoppingInitialValues(
      form,
      filter(
        useShoppingInitialValuesFragment,
        data?.viewer?.store?.setting || null,
      ),
    );
    const { loading, updateShoppingSetting } = useUpdateShoppingSetting(
      filter(updateShoppingSettingFragment, data?.viewer?.store || null),
      initialValues,
    );

    if (!data) {
      return <Spin indicator={<LoadingOutlined spin />} />;
    }

    return (
      <Form
        className={styles.root}
        form={form}
        initialValues={initialValues}
        onFinish={updateShoppingSetting}
      >
        <Header
          title={t('title')}
          prevTitle={t('common:setting')}
          backTo="/setting"
          buttons={
            <FormItem noStyle shouldUpdate>
              {({ resetFields, submit, getFieldsValue, getFieldsError }) =>
                Object.keys(getFieldsValue()).length === 0 ||
                areEqual(initialValues, getFieldsValue()) ? null : (
                  <div>
                    <Button onClick={() => resetFields()}>{t('cancel')}</Button>

                    <Button
                      onClick={submit}
                      type="primary"
                      loading={loading}
                      disabled={getFieldsError().some(
                        ({ errors }) => errors.length,
                      )}
                    >
                      {t('save')}
                    </Button>
                  </div>
                )
              }
            </FormItem>
          }
        >
          <div className={styles.form}>
            <Basic />

            <Checkout />

            <CheckoutUserInfo />

            <Invoice />

            <Order />

            <Advanced />

            <Accessibility />
          </div>
        </Header>
      </Form>
    );
  },
);

SettingShopping.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingShopping;