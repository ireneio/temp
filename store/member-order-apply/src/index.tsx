// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

import { applyType } from './hooks/useApplyForReturnOrExchange';

// import
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Button, Input, Form, message } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import Products, { getProductsStyles } from './Products';
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
import { useColumnsProductsObjectTypeMemberOrderApplyFragment } from './gqls/useColumns';

// typescript definition
interface PropsType extends FormComponentProps {
  type: applyType;
}

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default Form.create<PropsType>()(
  React.memo(({ form, type }: PropsType) => {
    const { getFieldDecorator, getFieldValue } = form;
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
      form,
    );
    const order = data?.viewer?.order;

    if (!order) return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: ${styles.screenSmMax}) {
              .${styles.root} h1 > span:last-child {
                color: ${transformColor(colors[3]).alpha(0.5)};
              }
            }

            ${getProductsStyles(colors)}
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
            {moment(order.createdAt).format('YYYY/MM/DD')}
          </span>
        </h1>

        {type !== 'exchange' || !checking ? null : (
          <div className={styles.replaceInfo}>
            {[
              {
                key: 'name',
                children: `${t('recipient.name')}：${getFieldValue(
                  'replaceRecipient.name',
                )}`,
              },
              {
                key: 'mobile',
                children: `${t('recipient.mobile')}：${getFieldValue(
                  'replaceRecipient.mobile',
                )}`,
              },
              {
                key: 'address',
                children: `${t('recipient.address')}：${getFieldValue(
                  'replaceRecipient.address.streetAddress',
                )}`,
              },
            ].map(props => (
              <p {...props} />
            ))}
          </div>
        )}

        {getFieldDecorator('selectedProducts', {
          initialValue: [],
        })(
          <Products
            availableProductsForApply={filter<
              useColumnsProductsObjectTypeMemberOrderApplyFragmentType[]
            >(
              useColumnsProductsObjectTypeMemberOrderApplyFragment,
              order.availableProductsForApply,
            )}
            checking={checking}
            form={form}
          />,
        )}

        {type !== 'exchange' || checking ? null : (
          <div className={styles.form}>
            <h3>{t('recipient.title')}</h3>
            {getFieldDecorator('replaceRecipient.name', {
              initialValue:
                order.shipmentInfo?.list?.[0]?.recipient?.name || '',
              preserve: true,
            })(<Input placeholder={t('recipient.name')} />)}

            {getFieldDecorator('replaceRecipient.mobile', {
              initialValue:
                order.shipmentInfo?.list?.[0]?.recipient?.mobile || '',
              preserve: true,
            })(<Input placeholder={t('recipient.mobile')} />)}

            {getFieldDecorator('replaceRecipient.address.streetAddress', {
              initialValue: order.address?.fullAddress || '',
              preserve: true,
            })(<Input placeholder={t('recipient.address')} />)}
          </div>
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

          <Button
            style={{
              color: colors[3],
              borderColor: colors[3],
            }}
            onClick={() => {
              if (getFieldValue('selectedProducts').length === 0) {
                message.info(t(`warning.${type}`));
                return;
              }

              if (!checking) {
                setChecking(true);
                return;
              }
              applyForReturnOrExchange();
            }}
            size="large"
          >
            {t('proceed')}
          </Button>
        </div>
      </div>
    );
  }),
);
