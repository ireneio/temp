// import
import React, { useContext } from 'react';
import { Form, Select, Collapse } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/payment.less';

// graphql typescript
import { paymentPaymentObjectTypeFragment as paymentPaymentObjectTypeFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  paymentList: paymentPaymentObjectTypeFragmentType[];
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;
const { Panel } = Collapse;

export default React.memo(({ paymentList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);

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
        <Select placeholder={t('payment')} disabled={paymentList.length === 0}>
          {paymentList.map(({ paymentId, name }) =>
            !paymentId ? null : (
              <Option key={paymentId} value={paymentId}>
                {name}
              </Option>
            ),
          )}
        </Select>
      </FormItem>

      <FormItem dependencies={['paymentId']} noStyle>
        {({ getFieldValue, setFieldsValue }) =>
          setFieldsValue({
            payment: paymentList.find(
              ({ paymentId }) => paymentId === getFieldValue(['paymentId']),
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
