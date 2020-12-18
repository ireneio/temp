// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Spin, Icon, Form, Input, Button, Modal, notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';

import { DEFAULT_MESSAGE } from './constants';
import styles from './styles/index.less';

// graphql typescript
import { getOrderPaidMessage as getOrderPaidMessageType } from './gqls/__generated__/getOrderPaidMessage';
import {
  updateOrderPaidMessage as updateOrderPaidMessageType,
  updateOrderPaidMessageVariables,
} from './gqls/__generated__/updateOrderPaidMessage';

// graphql import
import { getOrderPaidMessage, updateOrderPaidMessage } from './gqls';

// typescript definition
interface PropsType extends FormComponentProps {
  orderId: string;
}

// definition
export default Form.create<PropsType>()(
  React.memo(({ orderId, form }: PropsType) => {
    const { t } = useTranslation('member-order-pay-notify');
    const colors = useContext(ColorsContext);
    const { loading, data } = useQuery<getOrderPaidMessageType>(
      getOrderPaidMessage,
      {
        variables: { orderId },
      },
    );
    const { viewer } = data || {};
    const setting = viewer?.store?.setting;
    const order = viewer?.order;
    const [disabledEdit, setDisabledEdit] = useState(
      Boolean(order?.paidMessage?.length),
    );

    const [mutation] = useMutation<
      updateOrderPaidMessageType,
      updateOrderPaidMessageVariables
    >(updateOrderPaidMessage, {
      update: () => {
        notification.success({ message: t('send-success') });
        setDisabledEdit(true);
      },
    });

    if (loading || !setting || !order)
      return <Spin indicator={<Icon type="loading" spin />} />;

    const { paidMessage: customDefaultMessage } = setting;
    const { id, orderNo, paidMessage } = order;
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
                        mutation({
                          variables: {
                            updateOrder: {
                              id: id as string,
                              paidMessage: {
                                createData: [{ note: message }],
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
