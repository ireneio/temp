// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationFunction } from '@apollo/react-common';
import { FormComponentProps } from 'antd/lib/form/Form';

import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/react-components';
import {
  Affix,
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

import styles from './styles/index.less';

// graphql typescript
import { getNotificationsSetting } from './__generated__/getNotificationsSetting';
import {
  updateNotificationSetting,
  updateNotificationSettingVariables,
} from './__generated__/updateNotificationSetting';
import { getStoreId } from './__generated__/getStoreId';

// typescript definition
interface PropsType extends getNotificationsSetting, FormComponentProps {}

// definition
class SettingNotification extends React.Component<PropsType & I18nPropsType> {
  public state = {
    isAffixed: false,
  };

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

    cache.writeFragment({
      id,
      fragment: gql`
        fragment setting on Store {
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
      },
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
    const { isAffixed } = this.state;
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
              <Affix
                className={isAffixed ? styles.affixed : ''}
                offsetTop={56}
                target={() => this.rootRef.current}
                onChange={affixed =>
                  this.setState({ isAffixed: affixed || false })
                }
              >
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
              </Affix>

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

                      <Form.Item
                        className={styles.item}
                        label={
                          <div>
                            <p>{t('order.title')}</p>
                            <p>{t('order.description')}</p>
                          </div>
                        }
                        labelCol={{
                          order: 1,
                        }}
                      >
                        {getFieldDecorator('orderCreated', {
                          initialValue: orderCreated,
                          valuePropName: 'checked',
                        })(<Switch />)}
                      </Form.Item>

                      <Form.Item
                        className={styles.item}
                        label={
                          <div>
                            <p>{t('order-QA.title')}</p>
                            <p>{t('order-QA.description')}</p>
                          </div>
                        }
                        labelCol={{
                          order: 1,
                        }}
                      >
                        {getFieldDecorator('orderMessageReceived', {
                          initialValue: orderMessageReceived,
                          valuePropName: 'checked',
                        })(<Switch />)}
                      </Form.Item>

                      <Form.Item
                        className={styles.item}
                        label={
                          <div>
                            <p>
                              {t('order-applicaiton.title')}
                              <Tooltip title={t('order-applicaiton.tip')}>
                                <Icon
                                  type="question-circle-o"
                                  className={styles.icon}
                                />
                              </Tooltip>
                            </p>
                            <p>{t('order-applicaiton.description')}</p>
                          </div>
                        }
                        labelCol={{
                          order: 1,
                        }}
                      >
                        {getFieldDecorator('orderReturnedOrExchanged', {
                          initialValue: orderReturnedOrExchanged,
                          valuePropName: 'checked',
                        })(<Switch />)}
                      </Form.Item>

                      <Form.Item
                        className={styles.item}
                        label={
                          <div>
                            <p>
                              {t('payment-notification.title')}
                              <Tooltip title={t('payment-notification.tip')}>
                                <Icon
                                  type="question-circle-o"
                                  className={styles.icon}
                                />
                              </Tooltip>
                            </p>
                            <p>{t('payment-notification.description')}</p>
                          </div>
                        }
                        labelCol={{
                          order: 1,
                        }}
                      >
                        {getFieldDecorator('orderTransferMessageReceived', {
                          initialValue: orderTransferMessageReceived,
                          valuePropName: 'checked',
                        })(<Switch />)}
                      </Form.Item>

                      <Form.Item
                        className={styles.item}
                        label={
                          <div>
                            <p>
                              {t('product-QA.title')}
                              <Tooltip title={t('product-QA.tip')}>
                                <Icon
                                  type="question-circle-o"
                                  className={styles.icon}
                                />
                              </Tooltip>
                            </p>
                            <p>{t('product-QA.description')}</p>
                          </div>
                        }
                        labelCol={{
                          order: 1,
                        }}
                      >
                        {getFieldDecorator('productQAReceived', {
                          initialValue: productQAReceived,
                          valuePropName: 'checked',
                        })(<Switch />)}
                      </Form.Item>
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

const SettingNotificationPage = (): React.ReactNode => (
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
        <EnhancedSettingNotification {...(data as Pick<PropsType, 'viewer'>)} />
      );
    }}
  </Query>
);

SettingNotificationPage.getInitialProps = async () => ({
  namespacesRequired: ['setting-notification'],
});

export default SettingNotificationPage;
