// typescript import
import { NextPage } from 'next';
import { DataProxy } from 'apollo-cache';
import { MutationFunction } from '@apollo/react-common';
import { FormComponentProps } from 'antd/lib/form/Form';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/react-components';
import {
  Button,
  Switch,
  Spin,
  Input,
  Tooltip,
  Icon,
  Form,
  Divider,
  message,
} from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import SettingWrapper from '@admin/setting-wrapper';
import SettingBlock from '@admin/setting-block';

import styles from './styles/index.less';

// graphql typescript
import {
  getNotificationsSetting,
  getNotificationsSetting_viewer_store_setting_emailNotificationEventSubscription as getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscription,
} from './__generated__/getNotificationsSetting';
import {
  updateNotificationSetting,
  updateNotificationSettingVariables,
} from './__generated__/updateNotificationSetting';
import { getStoreId } from './__generated__/getStoreId';
import { settingNotificationFragment } from './__generated__/settingNotificationFragment';

// typescript definition
interface PropsType extends getNotificationsSetting, FormComponentProps {}

// definition
const ITEM_FILEDS: {
  key: Exclude<
    keyof getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscription,
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

class SettingNotification extends React.Component<PropsType & I18nPropsType> {
  private value: updateNotificationSettingVariables | null = null;

  private updateNotification = (
    mutate: MutationFunction<
      updateNotificationSetting,
      updateNotificationSettingVariables
    >,
  ) => () => {
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, value) => {
      this.value = value;
      if (!err) {
        mutate({ variables: { value } });
      }
    });
  };

  private updataCache = (
    cache: DataProxy,
    {
      data: {
        setStoreEmailNotificationEventSubscription: { status },
      },
    }: { data: updateNotificationSetting },
  ): void => {
    if (status !== 'SUCCESS') {
      this.onError();
      return;
    }

    const { t, form } = this.props;
    const user = cache.readQuery<getStoreId>({
      query: gql`
        query getStoreId {
          viewer {
            id
            store {
              id
            }
          }
        }
      `,
    });
    const id = user?.viewer?.store?.id;

    if (!id) {
      this.onError();
      return;
    }

    cache.writeFragment<settingNotificationFragment>({
      id,
      fragment: gql`
        fragment settingNotificationFragment on Store {
          setting {
            emailNotificationEventSubscription {
              recipientEmail
              orderCreated
              orderMessageReceived
              orderTransferMessageReceived
              orderReturnedOrExchanged
              productQAReceived
            }
          }
        }
      `,
      data: {
        __typename: 'Store',
        setting: {
          __typename: 'SettingObjectType',
          emailNotificationEventSubscription: {
            __typename: 'StoreEmailNotificationEventSubscription',
            ...this.value,
          },
        },
      } as settingNotificationFragment,
    });

    form.resetFields();
    message.success(t('success'));
  };

  private onError = (): void => {
    const { t, form } = this.props;

    form.resetFields();
    message.error(t('error'));
  };

  public render(): React.ReactNode {
    const { t, form, viewer } = this.props;
    const { getFieldDecorator, resetFields, isFieldsTouched } = form;
    const { recipientEmail = '', ...data } =
      viewer?.store?.setting?.emailNotificationEventSubscription ||
      ({} as getNotificationsSettingViewerStoreSettingEmailNotificationEventSubscription);

    return (
      <Mutation<updateNotificationSetting, updateNotificationSettingVariables>
        mutation={gql`
          mutation updateNotificationSetting(
            $value: StoreEmailNotificationEventSubscriptionInput!
          ) {
            setStoreEmailNotificationEventSubscription(input: $value) {
              status
            }
          }
        `}
        update={this.updataCache}
        onError={this.onError}
      >
        {(updateNotificationMutation, { loading }) => (
          <SettingWrapper
            title={t('title')}
            buttons={
              !isFieldsTouched() ? null : (
                <div>
                  <Button
                    onClick={() => resetFields()}
                    style={{ marginRight: '18px' }}
                  >
                    {t('cancel')}
                  </Button>

                  <Button
                    onClick={this.updateNotification(
                      updateNotificationMutation,
                    )}
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
              <SettingBlock
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
                          validator: (_, value, callback) => {
                            if (
                              value &&
                              (isFullWidth(value) || !isEmail(value))
                            )
                              callback(t('email-error'));
                            else callback();
                          },
                        },
                      ],
                      validateTrigger: 'onBlur',
                    })(<Input />)}
                  </Form.Item>
                </div>

                <Divider />

                <div>
                  <h3>{t('auto-email-setting')}</h3>

                  {ITEM_FILEDS.map(({ key, tip }) => (
                    <div key={key} className={styles.item}>
                      {getFieldDecorator(key, {
                        initialValue: Boolean(data[key]),
                        valuePropName: 'checked',
                      })(<Switch />)}

                      <div>
                        <div>
                          <span>{t(`${key}.title`)}</span>

                          {!tip ? null : (
                            <Tooltip title={t(`${key}.tip`)}>
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          )}
                        </div>

                        <div>{t(`${key}.description`)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </SettingBlock>
            </Form>
          </SettingWrapper>
        )}
      </Mutation>
    );
  }
}

const EnhancedSettingNotification = Form.create<PropsType>()(
  withTranslation('setting-notification')(SettingNotification),
);

const SettingNotificationPage: NextPage = React.memo(
  (): React.ReactElement => (
    <Query<getNotificationsSetting>
      query={gql`
        query getNotificationsSetting {
          viewer {
            id
            store {
              id
              setting {
                emailNotificationEventSubscription {
                  recipientEmail
                  orderCreated
                  orderMessageReceived
                  orderTransferMessageReceived
                  orderReturnedOrExchanged
                  productQAReceived
                }
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading || error)
          return <Spin indicator={<Icon type="loading" spin />} />;

        return (
          <EnhancedSettingNotification
            {...(data as Pick<PropsType, 'viewer'>)}
          />
        );
      }}
    </Query>
  ),
);

SettingNotificationPage.getInitialProps = async () => ({
  namespacesRequired: ['setting-notification'],
});

export default SettingNotificationPage;
