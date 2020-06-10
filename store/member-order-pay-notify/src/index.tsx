// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon, Form, Input, Button, Modal, notification } from 'antd';

import { useTranslation } from '@store/utils/lib/i18n';

import { DEFAULT_MESSAGE } from './constants';
import styles from './styles/index.less';

// graphql typescript
import { getOrderPaidMessage } from './__generated__/getOrderPaidMessage';
import { updateOrderPaidMessage as updateOrderPaidMessageType } from './__generated__/updateOrderPaidMessage';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';

// typescript definition
interface PropsType extends FormComponentProps {
  orderId: string;
}

// definition
const query = gql`
  query getOrderPaidMessage($orderId: ID!) {
    viewer {
      id
      store {
        id
        setting {
          paidMessage
        }
      }
      order(orderId: $orderId) {
        id
        orderNo
        paidMessage {
          note
        }
      }
    }

    getColorList {
      ...colorListFragment
    }
  }

  ${colorListFragment}
`;

export default Form.create<PropsType>()(
  React.memo(({ orderId, form }: PropsType) => {
    const { t } = useTranslation('member-order-pay-notify');
    const { loading, data } = useQuery<getOrderPaidMessage>(query, {
      variables: { orderId },
    });
    const { getColorList, viewer } = data || {};
    const setting = viewer?.store?.setting;
    const order = viewer?.order;
    const [disabledEdit, setDisabledEdit] = useState(
      Boolean(order?.paidMessage?.length),
    );

    const [updateOrderPaidMessage] = useMutation<updateOrderPaidMessageType>(
      gql`
        mutation updateOrderPaidMessage($newPaidMessage: [UpdateOrder]) {
          updateOrderList(updateOrderList: $newPaidMessage) {
            id
            paidMessage {
              note
            }
          }
        }
      `,
      {
        update: () => {
          notification.success({ message: t('send-success') });
          setDisabledEdit(true);
        },
      },
    );

    if (loading || !setting || !order || !getColorList)
      return <Spin indicator={<Icon type="loading" spin />} />;

    const { paidMessage: customDefaultMessage } = setting;
    const { id, orderNo, paidMessage } = order;
    const { colors } = getColorList;
    const { getFieldDecorator, getFieldError, validateFields } = form;

    return (
      <Form className={styles.root}>
        <div>
          <h1>
            {t('order-no')}
            {orderNo}
          </h1>

          <Form.Item>
            {getFieldDecorator('message', {
              initialValue:
                paidMessage?.slice(-1)[0]?.note ||
                customDefaultMessage ||
                DEFAULT_MESSAGE,
              rules: [
                { required: true, message: t('please-enter-paid-message') },
              ],
            })(<Input.TextArea disabled={disabledEdit} rows={12} />)}
          </Form.Item>

          <div>
            <Button
              size="large"
              style={{ color: colors[3], borderColor: colors[3] }}
              disabled={Boolean(getFieldError('message'))}
              onClick={() => {
                if (disabledEdit) setDisabledEdit(false);
                else
                  validateFields((errors, values) => {
                    if (!errors) {
                      const { message } = values;
                      const prevMessage =
                        paidMessage?.slice(-1)[0]?.note ||
                        customDefaultMessage ||
                        DEFAULT_MESSAGE;

                      if (message !== prevMessage)
                        updateOrderPaidMessage({
                          variables: {
                            newPaidMessage: {
                              id,
                              paidMessage: {
                                createData: { note: message },
                              },
                            },
                          },
                        });
                      else
                        Modal.warning({
                          title: t('pay-message-is-not-updated'),
                          content: <>{t('please-edit-paid-message')}</>,
                          okText: t('confirm'),
                          maskClosable: true,
                        });
                    }
                  });
              }}
            >
              {t(disabledEdit ? 'edit-again' : 'send')}
            </Button>
          </div>
        </div>
      </Form>
    );
  }),
);
