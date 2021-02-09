// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Button, Switch, Spin, Input, Icon, Form, Divider } from 'antd';
import { filter } from 'graphql-anywhere';
import { useQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { useValidateEmail } from '@meepshop/validator';

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
import { getNotificationsSetting } from './gqls/index';
import { useUpdateNotificationSettingFragment } from './gqls/useUpdateNotificationSetting';

// typescript definition
interface PropsType {
  form?: FormComponentProps['form'];
  namespacesRequired: string[];
}

// definition
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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const SettingNotificationPage: NextPage<PropsType> = Form.create<PropsType>()(
  React.memo(({ form }: FormComponentProps) => {
    const { t } = useTranslation('setting-notification');
    const { getFieldDecorator, resetFields, isFieldsTouched } = form;
    const { data } = useQuery<getNotificationsSettingType>(
      getNotificationsSetting,
    );

    const { updateNotification, loading } = useUpdateNotificationSetting(
      form,
      filter(useUpdateNotificationSettingFragment, data?.viewer?.store || null),
    );
    const validateEmail = useValidateEmail();

    if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

    const { recipientEmail = '', ...emailNotificationEventSubscription } =
      data?.viewer?.store?.setting?.emailNotificationEventSubscription ||
      ({} as getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscriptionType);

    return (
      <Header
        title={t('title')}
        prevTitle={t('common:setting')}
        backTo="/setting"
        buttons={
          !isFieldsTouched() ? null : (
            <div>
              <Button onClick={() => resetFields()}>{t('cancel')}</Button>

              <Button
                onClick={updateNotification}
                loading={loading}
                type="primary"
              >
                {t('save')}
              </Button>
            </div>
          )
        }
      >
        <Form className={styles.root} labelAlign="left">
          <Block
            title={t('auto-email')}
            description={t('auto-email-description')}
          >
            <div>
              <h3 className={styles.title}>{t('email')}</h3>

              <Form.Item>
                {getFieldDecorator('recipientEmail', {
                  initialValue: recipientEmail,
                  rules: [
                    {
                      required: true,
                      message: t('required'),
                    },
                    {
                      validator: validateEmail.validator,
                    },
                  ],
                  validateTrigger: 'onBlur',
                  normalize: validateEmail.normalize,
                })(<Input />)}
              </Form.Item>
            </div>

            <Divider />

            <div>
              <h3>{t('auto-email-setting')}</h3>

              {ITEM_FILEDS.map(({ key, tip }) => (
                <div key={key} className={styles.item}>
                  {getFieldDecorator(key, {
                    initialValue: Boolean(
                      emailNotificationEventSubscription[key],
                    ),
                    valuePropName: 'checked',
                  })(<Switch />)}

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
        </Form>
      </Header>
    );
  }),
);

SettingNotificationPage.getInitialProps = async () => ({
  namespacesRequired: ['setting-notification'],
});

export default SettingNotificationPage;
