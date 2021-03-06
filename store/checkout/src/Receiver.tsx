// import
import React, { useContext } from 'react';
import { Form, Input, Checkbox, Cascader } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import AddressCascader from '@meepshop/form-address-cascader';
import filter from '@meepshop/utils/lib/filter';
import Select, { Option } from '@meepshop/select';

import Invoice from './Invoice';
import useSynchronizeUserInfo from './hooks/useSynchronizeUserInfo';
import useSaveAsReceiverTemplate from './hooks/useSaveAsReceiverTemplate';
import useValidateName from './hooks/useValidateName';
import useValidateMobile from './hooks/useValidateMobile';
import useInvoiceOptions from './hooks/useInvoiceOptions';
import { CONVENIENCE_STORE_SHIPMENT } from './constants';
import styles from './styles/receiver.less';

// graphql typescript
import {
  receiverStoreFragment as receiverStoreFragmentType,
  receiverInCheckoutUserFragment as receiverInCheckoutUserFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useSynchronizeUserInfoFragment } from './gqls/useSynchronizeUserInfo';
import { useSaveAsReceiverTemplateFragment } from './gqls/useSaveAsReceiverTemplate';
import { useInvoiceOptionsStoreInvoiceSettingFragment } from './gqls/useInvoiceOptions';

// typescript definition
interface PropsType {
  isLogin: boolean;
  store: receiverStoreFragmentType | null;
  user: receiverInCheckoutUserFragmentType | null;
}

type CheckoutFieldsKeyType = '__typename' | 'name' | 'mobile' | 'address';

// definition
const { Item: FormItem } = Form;

export default React.memo(({ isLogin, store, user }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);

  const allHidden = Object.keys(store?.setting?.checkoutFields || {}).every(
    (key: CheckoutFieldsKeyType) =>
      key === '__typename' ||
      store?.setting?.checkoutFields?.[key] === 'HIDDEN',
  );

  const synchronizeUserInfo = useSynchronizeUserInfo({
    allHidden,
    user: filter(useSynchronizeUserInfoFragment, user || null),
  });
  const {
    canSaveAsTemplate,
    setReceiverWithTemplate,
  } = useSaveAsReceiverTemplate({
    isLogin,
    user: filter(useSaveAsReceiverTemplateFragment, user || null),
  });
  const validateName = useValidateName();
  const { validateMobile, validateTaiwanMobileNumber } = useValidateMobile();
  const invoiceOptions = useInvoiceOptions(
    filter(
      useInvoiceOptionsStoreInvoiceSettingFragment,
      store?.setting?.invoice || null,
    ),
  );

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('receiver-info')}

        {!isLogin && allHidden ? null : (
          <FormItem shouldUpdate noStyle>
            {({ getFieldsValue, setFieldsValue, validateFields }) => (
              <Checkbox
                onChange={({ target: { checked } }) =>
                  synchronizeUserInfo({
                    checked,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                  })
                }
              >
                {t('same-as-user-info')}
              </Checkbox>
            )}
          </FormItem>
        )}
      </div>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue, setFieldsValue }) =>
          !canSaveAsTemplate({ getFieldValue, setFieldsValue }) ||
          user?.shippableRecipientAddresses?.length === 0 ? null : (
            <FormItem>
              <Select
                size="large"
                placeholder={t('receiver-template')}
                onChange={(id: string) =>
                  setReceiverWithTemplate({ id, setFieldsValue })
                }
              >
                {user?.shippableRecipientAddresses?.map(({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </FormItem>
          )
        }
      </FormItem>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue }) => (
          <FormItem
            name={['name']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: (_, value) =>
                  validateName(value, getFieldValue(['shipment'])?.template),
              },
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <Input size="large" placeholder={t('name')} />
          </FormItem>
        )}
      </FormItem>

      <FormItem dependencies={['mobile']} noStyle>
        {({ getFieldValue }) => (
          <FormItem
            name={['mobile']}
            extra={validateTaiwanMobileNumber(getFieldValue(['mobile']) || '')}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: (_, value) =>
                  validateMobile(value, getFieldValue(['shipment'])?.template),
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              size="large"
              placeholder={t('mobile')}
              maxLength={
                ['allpay', 'ezship'].includes(
                  getFieldValue(['shipment'])?.template || '',
                )
                  ? 10
                  : 20
              }
            />
          </FormItem>
        )}
      </FormItem>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue }) =>
          CONVENIENCE_STORE_SHIPMENT.includes(
            getFieldValue(['shipment'])?.template || '',
          ) ? null : (
            <>
              <AddressCascader
                size="large"
                name={['addressAndZipCode']}
                placeholder={[t('area'), t('postal-code')]}
                shippableCountries={store?.shippableCountries || []}
                enableValidator
              />

              <FormItem
                name={['street']}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input size="large" placeholder={t('address')} />
              </FormItem>
            </>
          )
        }
      </FormItem>

      <FormItem dependencies={['invoice']} noStyle>
        {({ getFieldValue }) =>
          getFieldValue(['payment'])?.template === 'paypal' ||
          !invoiceOptions.length ? null : (
            <>
              <FormItem
                name={['invoice']}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ]}
              >
                <Cascader
                  size="large"
                  placeholder={t('invoice')}
                  options={invoiceOptions}
                  allowClear={false}
                />
              </FormItem>

              <Invoice invoice={getFieldValue(['invoice']) || null} />
            </>
          )
        }
      </FormItem>

      <FormItem dependencies={['isSaveAsReceiverTemplate']} noStyle>
        {({ getFieldValue, setFieldsValue }) =>
          !canSaveAsTemplate({ getFieldValue, setFieldsValue }) ? null : (
            <div className={styles.saveAsReceiverTemplate}>
              <FormItem
                name={['isSaveAsReceiverTemplate']}
                valuePropName="checked"
                noStyle
              >
                <Checkbox>{t('save-as-receiver-template')}</Checkbox>
              </FormItem>
            </div>
          )
        }
      </FormItem>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.title} .ant-checkbox-wrapper:hover .ant-checkbox-inner, 
            .ant-checkbox-input:focus + .ant-checkbox-inner, 
            .ant-checkbox-checked:after,
            .${
              styles.saveAsReceiverTemplate
            } .ant-checkbox-wrapper:hover .ant-checkbox-inner, 
            .ant-checkbox-input:focus + .ant-checkbox-inner, 
            .ant-checkbox-checked:after {
              border-color: ${colors[3]};
            }
            .${styles.title} .ant-checkbox-checked .ant-checkbox-inner,
            .${
              styles.saveAsReceiverTemplate
            } .ant-checkbox-checked .ant-checkbox-inner {
              background-color: ${colors[3]};
              border-color: ${colors[3]};
            }
            .${styles.root} .ant-input::placeholder, 
            .${styles.root} .ant-select-selection-placeholder {
              color: ${transformColor(colors[3]).alpha(0.4)};
            }
          `,
        }}
      />
    </div>
  );
});
