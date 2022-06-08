// import
import React from 'react';
import { Form, Input, Divider, Radio, Alert, Row, Col } from 'antd';

import Block from '@admin/block';
import Tooltip from '@admin/tooltip';
import country from '@admin/utils/lib/country';
import AddressCascader from '@meepshop/form-address-cascader';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from './styles/invoice.less';

// graphql typescript
import {
  StoreBillingTypeEnum,
  invoiceFragment,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  accountType: StoreBillingTypeEnum | null;
  invoice: invoiceFragment | null;
}

// definition
const { Item: FormItem } = Form;
const { Group: RadioGroup, Button: RadioButton } = Radio;

export default React.memo(({ accountType, invoice }: PropsType) => {
  const { t } = useTranslation('payment-setting');
  const getLanguage = useGetLanguage();

  return (
    <div className={styles.root}>
      {invoice?.accountType &&
      invoice?.name &&
      invoice?.addressV2?.country?.id &&
      invoice?.addressV2?.city?.id &&
      invoice?.addressV2?.area?.id &&
      invoice?.addressV2?.street ? null : (
        <Alert
          message=""
          description={t('invoice.complete-invoice-setting')}
          type="info"
          showIcon
          closable
        />
      )}

      <Block
        title={t('invoice.invoice－title')}
        description={t('invoice.description')}
      >
        <div>{t('invoice.email')}</div>
        <FormItem
          name={['invoice', 'email']}
          rules={[
            {
              required: true,
              message: t('required'),
            },
          ]}
        >
          <Input />
        </FormItem>

        <Divider />

        <div className={styles.title}>
          {t('invoice.invoice-data')}
          {accountType !== 'CONTRACT' ? null : (
            <Tooltip
              className={styles.tooltip}
              title={t('invoice.contract-tooltip')}
            />
          )}
        </div>

        {accountType === 'CONTRACT' ? (
          <>
            {[
              'name' as const,
              'addressV2' as const,
              ...(invoice?.accountType === 'COMPANY'
                ? ['title' as const, 'ban' as const]
                : []),
            ].map(key => (
              <Row key={key}>
                <Col span={2}>{t(`invoice.${key}.label`)}</Col>

                {(key === 'addressV2' && !invoice?.[key]?.street) ||
                !invoice?.[key] ? (
                  <Col span={22} className={styles.building}>
                    {t('invoice.building')}
                  </Col>
                ) : (
                  <Col span={22}>
                    {key === 'addressV2'
                      ? `${invoice?.[key]?.zipCode}
                      ${getLanguage(invoice?.[key]?.city?.name)}
                      ${getLanguage(invoice?.[key]?.area?.name)}
                      ${invoice?.[key]?.street}`
                      : invoice?.[key]}
                  </Col>
                )}
              </Row>
            ))}
          </>
        ) : (
          <>
            <div>{t('invoice.invoice-type')}</div>
            <FormItem
              name={['invoice', 'accountType']}
              rules={[
                {
                  required: true,
                  message: t('required'),
                },
              ]}
            >
              <RadioGroup buttonStyle="solid">
                <RadioButton value="INDIVIDUAL">
                  {t('invoice.duplicate')}
                </RadioButton>
                <RadioButton value="COMPANY">
                  {t('invoice.triplicate')}
                </RadioButton>
              </RadioGroup>
            </FormItem>

            <div>{t('invoice.name.label')}</div>
            <FormItem
              name={['invoice', 'name']}
              rules={[
                {
                  required: true,
                  message: t('required'),
                },
              ]}
            >
              <Input placeholder={t('invoice.name.placeholder')} />
            </FormItem>

            <div>{t('invoice.addressV2.label')}</div>
            <FormItem name={['invoice', 'addressV2']}>
              <AddressCascader
                placeholder={[t('invoice.county-area'), t('invoice.zip-code')]}
                shippableCountries={[country.Taiwan]}
              />
            </FormItem>

            <FormItem name={['invoice', 'street']}>
              <Input
                className={styles.street}
                placeholder={t('invoice.street')}
              />
            </FormItem>

            <FormItem dependencies={[['invoice', 'accountType']]} noStyle>
              {({ getFieldValue }) =>
                getFieldValue(['invoice', 'accountType']) !==
                'COMPANY' ? null : (
                  <div className={styles.flex}>
                    <div>
                      <div>{t('invoice.title.label')}</div>
                      <FormItem name={['invoice', 'title']}>
                        <Input placeholder={t('invoice.title.placeholder')} />
                      </FormItem>
                    </div>

                    <div>
                      <div>{t('invoice.ban.label')}</div>
                      <FormItem name={['invoice', 'ban']}>
                        <Input placeholder={t('invoice.ban.placeholder')} />
                      </FormItem>
                    </div>
                  </div>
                )
              }
            </FormItem>
          </>
        )}
      </Block>
    </div>
  );
});
