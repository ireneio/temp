// typescript import
import { NextPage } from 'next';

// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Spin, Button, Radio, Input } from 'antd';
import { areEqual } from 'fbjs';

import DatePicker from '@admin/date-picker';
import Tooltip from '@admin/tooltip';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

import Products from './Products';
import useDatesValidator from './hooks/useDatesValidator';
import useUpdateUpsellingSetting from './hooks/useUpdateUpsellingSetting';
import useUpsellingInitialValues from './hooks/useUpsellingInitialValues';
import styles from './styles/index.less';

// graphql typescript
import { getUpsellingSetting as getUpsellingSettingType } from '@meepshop/types/gqls/admin';

// graphql import
import { getUpsellingSetting } from './gqls';
import { useUpsellingInitialValuesFragment } from './gqls/useUpsellingInitialValues';

// definition
const { Item: FormItem } = Form;
const { Group: RadioGroup } = Radio;

const UpsellingProducts: NextPage = React.memo(() => {
  const { t } = useTranslation('upselling-products');
  const [form] = Form.useForm();
  const { data } = useQuery<getUpsellingSettingType>(getUpsellingSetting);
  const upsellingSetting = data?.viewer?.store?.upsellingSetting;
  const useUpsellingInitialValuesSetting = useMemo(
    () => filter(useUpsellingInitialValuesFragment, upsellingSetting || null),
    [upsellingSetting],
  );
  const initialValues = useUpsellingInitialValues(
    form,
    useUpsellingInitialValuesSetting,
  );
  const { updateUpsellingSetting, loading } = useUpdateUpsellingSetting(
    form,
    upsellingSetting?.id,
  );
  const datesValidator = useDatesValidator();

  if (!upsellingSetting) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Form
      className={styles.root}
      form={form}
      onFinish={updateUpsellingSetting}
      initialValues={initialValues}
    >
      <div>
        <div className={styles.title}>
          <div>{t('title')}</div>
          <div>
            <div>
              {t('subtitle')}

              <Link
                href="https://supportmeepshop.com/knowledgebase/?????????/"
                target="_blank"
              >
                <a href="https://supportmeepshop.com/knowledgebase/?????????/">
                  {t('more')}
                </a>
              </Link>
            </div>

            <FormItem shouldUpdate noStyle>
              {({ resetFields, submit, getFieldsValue }) =>
                areEqual(initialValues, getFieldsValue(true)) ? null : (
                  <div className={styles.controls}>
                    <Button onClick={() => resetFields()}>{t('cancel')}</Button>

                    <Button onClick={submit} loading={loading} type="primary">
                      {t('save')}
                    </Button>
                  </div>
                )
              }
            </FormItem>
          </div>
        </div>

        <div className={styles.block}>
          <div>{t('setting')}</div>

          <div className={styles.label}>{t('isActive.title')}</div>
          <FormItem name={['isActive']}>
            <RadioGroup
              className={styles.radioGroup}
              optionType="button"
              buttonStyle="solid"
              options={[false, true].map(value => ({
                label: t(`isActive.${value}`),
                value,
              }))}
            />
          </FormItem>

          <div className={styles.label}>
            {t('hasUnlimitedDuration.title')}
            <Tooltip title={t('hasUnlimitedDuration.tip')} />
          </div>
          <FormItem name={['hasUnlimitedDuration']}>
            <RadioGroup className={styles.radioGroup}>
              {[true, false].map(value => (
                <Radio key={`${value}`} className={styles.radio} value={value}>
                  {t(`hasUnlimitedDuration.${value}`)}
                </Radio>
              ))}

              <FormItem dependencies={[['hasUnlimitedDuration']]} noStyle>
                {({ getFieldValue }) =>
                  getFieldValue(['hasUnlimitedDuration']) ? null : (
                    <FormItem
                      name={['dates']}
                      rules={[{ validator: datesValidator }]}
                    >
                      <DatePicker
                        className={styles.datePicker}
                        disableTemplates
                        format="YYYY/MM/DD HH:mm"
                        showTime={{ format: 'HH:mm' }}
                        allowEmpty={[false, true]}
                      />
                    </FormItem>
                  )
                }
              </FormItem>
            </RadioGroup>
          </FormItem>

          <div className={styles.label}>
            {t('title-setting.title')}
            <Tooltip title={t('title-setting.tip')} />
          </div>
          <FormItem
            name={['title']}
            rules={[
              { type: 'string', max: 60, message: t('title-setting.error') },
            ]}
          >
            <Input placeholder={t('title-setting.placeholder')} />
          </FormItem>

          <div className={styles.label}>
            {t('hasLimitPerOrder.title')}
            <Tooltip title={t('hasLimitPerOrder.tip')} />
          </div>
          <FormItem name={['hasLimitPerOrder']}>
            <RadioGroup className={styles.radioGroup}>
              {[false, true].map(value => (
                <Radio key={`${value}`} className={styles.radio} value={value}>
                  {t(`hasLimitPerOrder.${value}`)}
                </Radio>
              ))}

              <FormItem dependencies={[['hasLimitPerOrder']]} noStyle>
                {({ getFieldValue }) =>
                  !getFieldValue(['hasLimitPerOrder']) ? null : (
                    <FormItem
                      name={['limitPerOrder']}
                      normalize={value => {
                        const number = parseInt(value, 10);

                        return Number.isNaN(number) ? null : number;
                      }}
                      rules={[
                        {
                          type: 'number',
                          min: 1,
                          message: t('hasLimitPerOrder.error'),
                        },
                      ]}
                    >
                      <Input
                        className={styles.inputNumber}
                        addonAfter={t('hasLimitPerOrder.unit')}
                      />
                    </FormItem>
                  )
                }
              </FormItem>
            </RadioGroup>
          </FormItem>
        </div>

        <div className={styles.block}>
          <div>
            {t('products.title')}
            <Tooltip title={t('products.tip')} />
          </div>

          <FormItem name={['products']} noStyle>
            <Products />
          </FormItem>
        </div>
      </div>
    </Form>
  );
});

UpsellingProducts.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default UpsellingProducts;
