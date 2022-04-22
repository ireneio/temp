// import
import React, { useContext, useMemo, useRef } from 'react';
import { Form, Select, Collapse, Input } from 'antd';
import transformColor from 'color';
import { UserAgent } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import { FILTER_ECPAY_PLAYFORM } from './constants';
import styles from './styles/payment.less';

// graphql typescript
import {
  paymentOrderFragment as paymentOrderFragmentType,
  paymentOrderFragment_categories_paymentList as paymentOrderFragmentCategoriesPaymentListType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  loading: boolean;
  computeOrderList: paymentOrderFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;
const { Panel } = Collapse;

export default React.memo(({ loading, computeOrderList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const paymentListRef = useRef<
    (paymentOrderFragmentCategoriesPaymentListType | null)[]
  >([]);

  const paymentList = useMemo(() => {
    if (loading) return paymentListRef.current;

    const payments = computeOrderList?.categories?.[0]?.paymentList || [];

    const isECPayIgnorePlatform = FILTER_ECPAY_PLAYFORM.some(platform =>
      UserAgent.isPlatform(platform),
    );

    const list = !isECPayIgnorePlatform
      ? payments
      : payments.filter(
          payment =>
            !['WebATM', 'BARCODE'].includes(
              payment?.accountInfo?.allpay?.ChoosePayment || '',
            ),
        );

    paymentListRef.current = list;

    return list;
  }, [loading, computeOrderList]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('payment')}</div>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue }) => (
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
              dropdownClassName={styles.selectDropdown}
              placeholder={
                paymentList.length === 0
                  ? t('payment-list-empty')
                  : t('payment')
              }
              disabled={paymentList.length === 0}
              loading={loading}
              size="large"
            >
              {paymentList.map(payment => {
                const exclude = payment?.excludeShipping?.some(
                  id => id === getFieldValue(['shipment'])?.id,
                );

                return !payment?.paymentId ? null : (
                  <Option
                    key={payment.paymentId}
                    value={payment.paymentId}
                    disabled={exclude}
                  >
                    {payment.name}
                    {exclude ? ` ${t('payment-exclude')}` : ''}
                  </Option>
                );
              })}
            </Select>
          </FormItem>
        )}
      </FormItem>

      {paymentList.length !== 0 || loading ? null : (
        <div className={styles.error}>{t('payment-list-empty-error')}</div>
      )}

      <FormItem dependencies={['paymentId']} noStyle>
        {({ getFieldValue, setFieldsValue }) =>
          setFieldsValue({
            payment: paymentList.find(
              payment => payment?.paymentId === getFieldValue(['paymentId']),
            ),
          })
        }
      </FormItem>

      <FormItem name={['payment']} noStyle>
        <Input type="hidden" />
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
            .${
              styles.root
            } .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
              background: ${transformColor(colors[3]).alpha(0.03)};
              border-color: ${colors[5]};
              color: ${transformColor(colors[3]).alpha(0.25)};
            }

            .${styles.selectDropdown} .ant-select-item-option-disabled {
              color: ${transformColor(colors[3]).alpha(0.3)};
            }

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
