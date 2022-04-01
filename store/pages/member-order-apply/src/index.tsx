// typescript import
import { applyType } from './hooks/useApplyForReturnOrExchange';

// import
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Spin, Button, message } from 'antd';
import { format } from 'date-fns';
import transformColor from 'color';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import Products from './Products';
import Recipient from './Recipient';
import useApplyForReturnOrExchange from './hooks/useApplyForReturnOrExchange';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderApply as getMemberOrderApplyType,
  getMemberOrderApplyVariables as getMemberOrderApplyVariablesType,
  useColumnsProductsObjectTypeMemberOrderApplyFragment as useColumnsProductsObjectTypeMemberOrderApplyFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getMemberOrderApply } from './gqls';
import { recipientFragment } from './gqls/recipient';
import { useColumnsProductsObjectTypeMemberOrderApplyFragment } from './gqls/useColumns';

// typescript definition
interface PropsType {
  type: applyType;
}

// definition
const { Item: FormItem } = Form;

// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(({ type }: PropsType) => {
  const { t } = useTranslation('member-order-apply');
  const colors = useContext(ColorsContext);
  const {
    query: { orderId },
    push,
  } = useRouter();

  const [checking, setChecking] = useState<boolean>(false);

  const { data } = useQuery<
    getMemberOrderApplyType,
    getMemberOrderApplyVariablesType
  >(getMemberOrderApply, {
    variables: { orderId: orderId as string },
  });
  const applyForReturnOrExchange = useApplyForReturnOrExchange(
    type,
    orderId as string,
  );
  const order = data?.viewer?.order;

  if (!order) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Form className={styles.root} onFinish={applyForReturnOrExchange}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: ${styles.screenSmMax}) {
              .${styles.root} h1 > span:last-child {
                color: ${transformColor(colors[3]).alpha(0.5)};
              }
            }
          `,
        }}
      />

      <h1>
        <span>
          {t('order-no')}

          {order.orderNo}
        </span>

        <span>
          <span>{t('created-at')}</span>

          {format(new Date(order.createdAt || new Date()), 'yyyy/MM/dd')}
        </span>
      </h1>

      {type !== 'exchange' || !checking ? null : (
        <Recipient order={filter(recipientFragment, order)} checking />
      )}

      <FormItem name={['selectedProducts']} initialValue={[]}>
        <Products
          availableProductsForApply={filter<
            useColumnsProductsObjectTypeMemberOrderApplyFragmentType[]
          >(
            useColumnsProductsObjectTypeMemberOrderApplyFragment,
            order.availableProductsForApply,
          )}
          checking={checking}
        />
      </FormItem>

      {type !== 'exchange' || checking ? null : (
        <Recipient order={filter(recipientFragment, order)} checking={false} />
      )}

      <div className={styles.buttonRoot}>
        <Button
          style={{
            color: colors[3],
            borderColor: colors[3],
          }}
          onClick={() => (checking ? setChecking(false) : push('/orders'))}
          size="large"
        >
          {t('recede')}
        </Button>

        <FormItem shouldUpdate noStyle>
          {({ getFieldValue, submit }) => (
            <Button
              style={{
                color: colors[3],
                borderColor: colors[3],
              }}
              onClick={() => {
                if (getFieldValue(['selectedProducts']).length === 0) {
                  message.info(t(`warning.${type}`));
                  return;
                }

                if (!checking) {
                  setChecking(true);
                  return;
                }

                submit();
              }}
              size="large"
            >
              {t('proceed')}
            </Button>
          )}
        </FormItem>
      </div>
    </Form>
  );
});
