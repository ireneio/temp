// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { areEqual } from 'fbjs';
import { Form, Button, Divider } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

import Invoice from './Invoice';
import Payment from './Payment';
import useInitialValues from './hooks/useInitialValues';
import useSave from './hooks/useSave';
import styles from './styles/index.less';

// graphql typescript
import { getBilling as getBillingType } from '@meepshop/types/gqls/admin';

// graphql import
import { getBilling } from './gqls';
import { useInitialValuesStoreBillingSettingFragment } from './gqls/useInitialValues';
import { invoiceFragment } from './gqls/invoice';
import { paymentFragment } from './gqls/payment';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;

const PaymentSetting: NextPage<PropsType> = React.memo(() => {
  const [form] = Form.useForm();
  const { t } = useTranslation('payment-setting');
  const { data } = useQuery<getBillingType>(getBilling);
  const initialValues = useInitialValues(
    form,
    filter(
      useInitialValuesStoreBillingSettingFragment,
      data?.viewer?.store?.setting?.billing || null,
    ),
  );
  const { loading, save } = useSave(
    initialValues,
    filter(paymentFragment, data?.viewer?.store || null),
  );

  return (
    <Form
      className={styles.root}
      form={form}
      initialValues={initialValues}
      onFinish={save}
    >
      <Header
        title={t('title')}
        prevTitle={t('bill-payment')}
        backTo="/bill-payment"
        buttons={
          <FormItem shouldUpdate noStyle>
            {({ getFieldsValue, resetFields, submit }) =>
              areEqual(initialValues, getFieldsValue(true)) ? null : (
                <div>
                  <Button onClick={() => resetFields()}>{t('cancel')}</Button>

                  <Button type="primary" loading={loading} onClick={submit}>
                    {t('save')}
                  </Button>
                </div>
              )
            }
          </FormItem>
        }
      >
        <div className={styles.form}>
          <Invoice
            accountType={
              data?.viewer?.store?.setting?.billing?.billingType || null
            }
            invoice={filter(
              invoiceFragment,
              data?.viewer?.store?.setting?.billing?.invoice || null,
            )}
          />

          <Divider className={styles.divider} />

          <Payment
            store={filter(paymentFragment, data?.viewer?.store || null)}
          />
        </div>
      </Header>
    </Form>
  );
});

PaymentSetting.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default PaymentSetting;
