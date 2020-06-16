// typescript import
import { NextPage } from 'next';
import { DataProxy } from 'apollo-cache';
import { MutationFunction } from '@apollo/react-common';
import { FormComponentProps } from 'antd/lib/form/Form';

import { I18nPropsType } from '@admin/utils/lib/i18n';

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
  message,
} from 'antd';

import { withTranslation } from '@admin/utils/lib/i18n';
import Link from '@admin/link';
import SettingHeader from '@admin/setting-header';

import styles from './styles/index.less';

// graphql typescript
import { getNotificationsSetting } from './__generated__/getNotificationsSetting';
import {
  updateNotificationSetting,
  updateNotificationSettingVariables,
} from './__generated__/updateNotificationSetting';
import { getStoreId } from './__generated__/getStoreId';
import { settingNotificationFragment } from './__generated__/settingNotificationFragment';

// typescript definition
interface PropsType extends getNotificationsSetting, FormComponentProps {}

// definition
class SettingNotification extends React.Component<PropsType & I18nPropsType> {
  private value: updateNotificationSettingVariables | null = null;

  private rootRef: React.RefObject<HTMLInputElement> = React.createRef();

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
    const {
      recipientEmail = '',
      orderCreated = false,
      orderMessageReceived = false,
      orderReturnedOrExchanged = false,
      orderTransferMessageReceived = false,
      productQAReceived = false,
    } = viewer?.store?.setting?.emailNotificationEventSubscription || {};

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
          <Spin
            indicator={<Icon type="loading" spin />}
            spinning={loading}
            wrapperClassName={styles.spin}
          >
            <div className={styles.root} ref={this.rootRef}>
              <SettingHeader target={() => this.rootRef.current}>
                <div className={styles.header}>
                  <h1>
                    <Link href="/setting">
                      <Icon className={styles.indicator} type="left" />
                    </Link>
                    {t('title')}
                  </h1>

                  {!isFieldsTouched() ? null : (
                    <div>
                      <Button
                        onClick={() => resetFields()}
                        style={{ marginRight: '18px' }}
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        type="primary"
                        onClick={this.updateNotification(
                          updateNotificationMutation,
                        )}
                      >
                        {t('save')}
                      </Button>
                    </div>
                  )}
                </div>
              </SettingHeader>

              <Form className={styles.content} labelAlign="left">
                <section>
                  <div>
                    <h2>{t('auto-email')}</h2>
                    <p>{t('auto-email-description')}</p>
                  </div>
                  <div>
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
                              pattern: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                              message: t('email-error'),
                            },
                          ],
                          validateTrigger: 'onBlur',
                        })(<Input />)}
                      </Form.Item>
                    </div>
                    <div className={styles.hr} />
                    <div>
                      <h3>{t('auto-email-setting')}</h3>

                      <div className={styles.item}>
                        {getFieldDecorator('orderCreated', {
                          initialValue: orderCreated,
                          valuePropName: 'checked',
                        })(<Switch />)}

                        <div>
                          <div>{t('order.title')}</div>
                          <div>{t('order.description')}</div>
                        </div>
                      </div>

                      <div className={styles.item}>
                        {getFieldDecorator('orderMessageReceived', {
                          initialValue: orderMessageReceived,
                          valuePropName: 'checked',
                        })(<Switch />)}

                        <div>
                          <div>{t('order-QA.title')}</div>
                          <div>{t('order-QA.description')}</div>
                        </div>
                      </div>

                      <div className={styles.item}>
                        {getFieldDecorator('orderReturnedOrExchanged', {
                          initialValue: orderReturnedOrExchanged,
                          valuePropName: 'checked',
                        })(<Switch />)}

                        <div>
                          <div>
                            <span>{t('order-applicaiton.title')}</span>
                            <Tooltip title={t('order-applicaiton.tip')}>
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </div>
                          <div>{t('order-applicaiton.description')}</div>
                        </div>
                      </div>

                      <div className={styles.item}>
                        {getFieldDecorator('orderTransferMessageReceived', {
                          initialValue: orderTransferMessageReceived,
                          valuePropName: 'checked',
                        })(<Switch />)}

                        <div>
                          <div>
                            <span>{t('payment-notification.title')}</span>
                            <Tooltip title={t('payment-notification.tip')}>
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </div>
                          <div>{t('payment-notification.description')}</div>
                        </div>
                      </div>

                      <div className={styles.item}>
                        {getFieldDecorator('productQAReceived', {
                          initialValue: productQAReceived,
                          valuePropName: 'checked',
                        })(<Switch />)}

                        <div>
                          <div>
                            <span>{t('product-QA.title')}</span>
                            <Tooltip title={t('product-QA.tip')}>
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </div>
                          <div>{t('product-QA.description')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Form>
            </div>
          </Spin>
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
          return (
            <Spin
              indicator={<Icon type="loading" spin />}
              className={styles.spin}
            />
          );

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
