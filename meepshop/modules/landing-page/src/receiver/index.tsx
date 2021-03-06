// typescript import
import { FormInstance } from 'antd';
import { UseComputeOrderType } from '../hooks/useComputeOrder';

// import
import React, { useContext } from 'react';
import { Cascader, Form, Input } from 'antd';
import { isAlpha } from 'validator';

import Email from '@meepshop/form-email';
import DatePicker from '@meepshop/form-date-picker';
import validateMobile from '@meepshop/utils/lib/validate/mobile';
import { useTranslation } from '@meepshop/locales';
import AddressCascader from '@meepshop/form-address-cascader';
import Select, { Option } from '@meepshop/select';
import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import Invoice from './Invoice';
import Store from './Store';
import styles from './styles/index.less';
import useInvoiceOptions from './hooks/useInvoiceOptions';

// graphql typescript
import {
  receiverUserFragment,
  receiverLandingPageModuleFragment,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { useInvoiceOptionsFragment } from './gqls/useInvoiceOptions';

// typescript definition
interface PropsType {
  form: FormInstance;
  receiver: receiverLandingPageModuleFragment;
  viewer: receiverUserFragment | null;
  shipment: UseComputeOrderType['shipment'];
}

// definition
const { TextArea } = Input;
const { Item } = Form;

export default React.memo(
  ({
    form,
    receiver: { gender, birthday, invoice, note, shippableCountries },
    viewer,
    shipment,
  }: PropsType) => {
    const colors = useContext(ColorsContext);
    const { t } = useTranslation('landing-page');
    const invoiceOptions = useInvoiceOptions(
      filter(useInvoiceOptionsFragment, viewer?.store?.setting || null),
    );
    const isLogin = viewer?.role === 'SHOPPER';
    const { getFieldValue } = form;

    return (
      <div className={styles.root}>
        <h3 id="choose-shipment-store" className={styles.title}>
          {t('receiver-info')}
        </h3>
        <div className={styles.nameRoot}>
          <Item
            className={styles.formItem}
            name={['name']}
            validateFirst
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: (_rule, value, callback) => {
                  if (!value) callback();

                  switch (shipment?.template) {
                    case 'ezship':
                      return callback(
                        value.length > 60
                          ? t('name-too-long', { amount: 60 })
                          : undefined,
                      );

                    case 'gmo':
                      return callback(
                        value.length > 10
                          ? t('name-too-long', { amount: 10 })
                          : undefined,
                      );

                    case 'allpay':
                      return callback(
                        /[\^'`!@#%&*+$~\-(){}\\"<>|_[\] ,???\d]/.test(value) ||
                          (isAlpha(value)
                            ? value.length > 10 || value.length < 4
                            : value.length > 5 || value.length < 2)
                          ? t('allpay-name-too-long')
                          : undefined,
                      );

                    default:
                      return callback();
                  }
                },
              },
            ]}
          >
            <Input placeholder={t('receiver')} />
          </Item>

          {!gender ? null : (
            <Item
              className={`${styles.formItem} ${styles.gender}`}
              name={['gender']}
              rules={[
                {
                  required: gender.required,
                  message: t('is-required'),
                },
              ]}
            >
              <Select placeholder={t('gender')}>
                {['male', 'female'].map((name, index) => (
                  <Option key={name} value={index}>
                    {t(name)}
                  </Option>
                ))}
              </Select>
            </Item>
          )}
        </div>
        {!birthday ? null : (
          <DatePicker
            enableValidator={birthday?.required}
            formItemProps={{
              name: ['birthday'],
              className: styles.formItem,
            }}
            datePickerProps={{
              className: styles.birthday,
              placeholder: t('birthday'),
            }}
          />
        )}
        {isLogin ? null : (
          <Email
            className={styles.formItem}
            name={['userEmail']}
            checkShopperEmail
          />
        )}
        <Item
          className={styles.formItem}
          extra={validateMobile.extra(
            getFieldValue('mobile'),
            t('validate-mobile:taiwan-mobile-ten-digits'),
          )}
          name={['mobile']}
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
            {
              validator: validateMobile.rule(
                {
                  notMobile: t('validate-mobile:not-phone'),
                  notNumber: t('validate-mobile:not-number'),
                },
                shipment?.template,
              ),
            },
          ]}
        >
          <Input
            placeholder={t('mobile')}
            maxLength={
              ['allpay', 'ezship'].includes(shipment?.template || '') ? 10 : 20
            }
          />
        </Item>
        {['allpay', 'ezship', 'presco'].includes(shipment?.template || '') ? (
          <Item className={styles.formItem}>
            <Store form={form} shipment={shipment} />
          </Item>
        ) : (
          <>
            <AddressCascader
              className={styles.formItem}
              name={['addressAndZipCode']}
              placeholder={[t('area'), t('postal-code')]}
              shippableCountries={shippableCountries}
              enableValidator
            />

            <Item
              className={styles.formItem}
              name={['street']}
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
            >
              <Input placeholder={t('address')} />
            </Item>
          </>
        )}
        {!invoice ? null : (
          <>
            <Item
              className={styles.formItem}
              name={['invoice']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
            >
              <Cascader
                placeholder={t('invoice')}
                options={invoiceOptions}
                allowClear={false}
              />
            </Item>

            <Invoice form={form} />
          </>
        )}
        {!note ? null : (
          <Item
            className={styles.formItem}
            name={['notes']}
            rules={[
              {
                required: note.required,
                message: t('is-required'),
              },
            ]}
          >
            <TextArea placeholder={t('notes')} rows={4} />
          </Item>
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.title} {
                border-bottom: 1px solid ${colors[5]};
              }
            `,
          }}
        />
      </div>
    );
  },
);
