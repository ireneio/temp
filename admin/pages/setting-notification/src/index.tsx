// typescript import
import { NextPage } from 'next';

// import
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Button, Switch, Spin, Divider } from 'antd';

import Email from '@meepshop/form-email';
import { useTranslation } from '@meepshop/locales';

import Header from '@admin/header';
import Block from '@admin/block';
import Tooltip from '@admin/tooltip';

import useUpdateNotificationSetting from './hooks/useUpdateNotificationSetting';
import styles from './styles/index.less';

// graphql typescript
import {
  getNotificationsSetting as getNotificationsSettingType,
  getNotificationsSetting_viewer_store_setting_emailNotificationEventSubscription as getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscriptionType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getNotificationsSetting } from './gqls';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const ITEM_FILEDS: {
  key: Exclude<
    keyof getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscriptionType,
    'recipientEmail'
  >;
  tip?: boolean;
}[] = [
  {
    key: 'orderCreated',
  },
  {
    key: 'orderMessageReceived',
  },
  {
    key: 'orderReturnedOrExchanged',
    tip: true,
  },
  {
    key: 'orderTransferMessageReceived',
    tip: true,
  },
  {
    key: 'productQAReceived',
    tip: true,
  },
];

const SettingNotificationPage: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('setting-notification');
  const [form] = Form.useForm();
  const { data } = useQuery<getNotificationsSettingType>(
    getNotificationsSetting,
  );
  const { updateNotification, loading } = useUpdateNotificationSetting(
    data?.viewer?.store?.id || null,
  );

  useEffect(() => {
    if (data) form.resetFields();
  }, [form, data]);

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  const { recipientEmail = '', ...emailNotificationEventSubscription } =
    data?.viewer?.store?.setting?.emailNotificationEventSubscription ||
    ({} as getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscriptionType);

  return (
    <Form className={styles.root} form={form} onFinish={updateNotification}>
      <Header
        title={t('title')}
        prevTitle={t('common:setting')}
        backTo="/setting"
        buttons={
          <FormItem shouldUpdate noStyle>
            {({ isFieldsTouched, resetFields, submit }) =>
              !isFieldsTouched() ? null : (
                <div>
                  <Button onClick={() => resetFields()}>{t('cancel')}</Button>

                  <Button onClick={submit} loading={loading} type="primary">
                    {t('save')}
                  </Button>
                </div>
              )
            }
          </FormItem>
        }
      >
        <div className={styles.form}>
          <Block
            title={t('auto-email')}
            description={t('auto-email-description')}
          >
            <div>
              <h3 className={styles.title}>{t('email')}</h3>

              <Email
                name={['recipientEmail']}
                initialValue={recipientEmail}
                isNotShopper
              />
            </div>

            <Divider />

            <div>
              <h3>{t('auto-email-setting')}</h3>

              {ITEM_FILEDS.map(({ key, tip }) => (
                <div key={key} className={styles.item}>
                  <FormItem
                    name={[key]}
                    initialValue={Boolean(
                      emailNotificationEventSubscription[key],
                    )}
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch />
                  </FormItem>

                  <div>
                    <div>
                      <span>{t(`${key}.title`)}</span>

                      {!tip ? null : <Tooltip title={t(`${key}.tip`)} />}
                    </div>

                    <div>{t(`${key}.description`)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </Header>
    </Form>
  );
});

SettingNotificationPage.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingNotificationPage;
