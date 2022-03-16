// import
import React, { useContext, useMemo } from 'react';
import { Form, Select, Collapse } from 'antd';
import transformColor from 'color';
import { UserAgent } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import { FILTER_ECPAY_PLAYFORM } from './constants';
import styles from './styles/payment.less';

// graphql typescript
import { paymentOrderFragment as paymentOrderFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  computeOrderList: paymentOrderFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;
const { Panel } = Collapse;

export default React.memo(({ computeOrderList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);

  const paymentList = useMemo(() => {
    const payments = computeOrderList?.categories?.[0]?.paymentList || [];

    const isECPayIgnorePlatform = FILTER_ECPAY_PLAYFORM.some(platform =>
      UserAgent.isPlatform(platform),
    );

    return !isECPayIgnorePlatform
      ? payments
      : payments.filter(
          payment =>
            !['WebATM', 'BARCODE'].includes(
              payment?.accountInfo?.allpay?.ChoosePayment || '',
            ),
        );
  }, [computeOrderList]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('payment')}</div>

      <FormItem
        name={['paymentId']}
        rules={[
          {
            required: true,
            message: t('is-required'),
          },
        ]}
        validateTrigger="onBlur"
      >
        <Select
          placeholder={t('payment')}
          disabled={paymentList.length === 0}
          size="large"
        >
          {paymentList.map(payment =>
            !payment?.paymentId ? null : (
              <Option key={payment.paymentId} value={payment.paymentId}>
                {payment.name}
              </Option>
            ),
          )}
        </Select>
      </FormItem>

      <FormItem dependencies={['paymentId']} noStyle>
        {({ getFieldValue, setFieldsValue }) =>
          setFieldsValue({
            payment: paymentList.find(
              payment => payment?.paymentId === getFieldValue(['paymentId']),
            ),
          })
        }
      </FormItem>

      <FormItem dependencies={['paymentId']} noStyle>
        {({ getFieldValue }) => {
          const description = getFieldValue(['payment'])?.description;

          return !description ? null : (
            <Collapse
              className={styles.collapse}
              defaultActiveKey={['description']}
              bordered={false}
            >
              <Panel
                className={styles.panel}
                key="description"
                header={t('payment-description')}
              >
                <pre>{description}</pre>
              </Panel>
            </Collapse>
          );
        }}
      </FormItem>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.panel} {
              background: ${transformColor(colors[5]).alpha(0.15)};
              color: ${colors[3]};
            }
          `,
        }}
      />
    </div>
  );
});
