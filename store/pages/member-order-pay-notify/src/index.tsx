// import
import React, { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import useSubmitOrderRemittanceAdvice from './hooks/useSubmitOrderRemittanceAdvice';
import useValidateSameMessage from './hooks/useValidateSameMessage';
import useEditMode from './hooks/useEditMode';
import { DEFAULT_MESSAGE } from './constants';
import styles from './styles/index.less';

// graphql typescript
import { getOrderPaidMessage as getOrderPaidMessageType } from '@meepshop/types/gqls/store';

// graphql import
import { getOrderPaidMessage } from './gqls';
import { useSubmitOrderRemittanceAdviceFragment } from './gqls/useSubmitOrderRemittanceAdvice';

// typescript definition
interface PropsType {
  orderId: string;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(({ orderId }: PropsType) => {
  const { t } = useTranslation('member-order-pay-notify');
  const colors = useContext(ColorsContext);
  const { loading, data } = useQuery<getOrderPaidMessageType>(
    getOrderPaidMessage,
    {
      variables: { orderId },
    },
  );
  const order = data?.viewer?.order || null;
  const { orderNo, paidMessage } = order || {};
  const [editMode, setEditMode] = useEditMode(paidMessage || null);
  const submitOrderRemittanceAdvice = useSubmitOrderRemittanceAdvice(
    filter(useSubmitOrderRemittanceAdviceFragment, order),
    () => setEditMode(false),
  );
  const initialValue = useMemo(
    () =>
      paidMessage?.slice(-1)[0]?.note ||
      data?.viewer?.store?.setting?.paidMessage ||
      DEFAULT_MESSAGE,
    [paidMessage, data],
  );
  const validateSameMessage = useValidateSameMessage(initialValue);

  if (loading || !orderNo || !initialValue)
    return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Form className={styles.root} onFinish={submitOrderRemittanceAdvice}>
      <h1>
        {t('order-no')}

        {orderNo}
      </h1>

      <FormItem
        name={['remittanceAdvice']}
        initialValue={initialValue}
        rules={[
          { required: true, message: t('please-enter-paid-message') },
          { validator: validateSameMessage },
        ]}
      >
        <TextArea disabled={!editMode} rows={12} />
      </FormItem>

      <FormItem shouldUpdate noStyle>
        {({ getFieldsError, submit }) => (
          <Button
            style={{ color: colors[3], borderColor: colors[3] }}
            disabled={getFieldsError().some(
              ({ errors }) => errors.length !== 0,
            )}
            onClick={() => {
              if (!editMode) setEditMode(true);
              else submit();
            }}
            size="large"
          >
            {t(!editMode ? 'edit-again' : 'send')}
          </Button>
        )}
      </FormItem>
    </Form>
  );
});
