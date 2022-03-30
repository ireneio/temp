// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import {
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Checkbox,
  Empty,
} from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import Header from '@admin/header';
import Tooltip from '@admin/tooltip';

import Products from './Products';
import PromoCodeInput from './PromoCodeInput';
import PromoCodeExample from './PromoCodeExample';
import useProgramInitialValues from './hooks/useProgramInitialValues';
import useCreateAffiliateProgram from './hooks/useCreateAffiliateProgram';
import useUpdateAffiliateProgram from './hooks/useUpdateAffiliateProgram';
import useSearchPartners from './hooks/useSearchPartners';
import useValidatePromoCode from './hooks/useValidatePromoCode';
import styles from './styles/edit.less';

// graphql typescript
import {
  getProgram as getProgramType,
  getProgramVariables as getProgramVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getProgram } from './gqls/edit';
import { useProgramInitialValuesFragment } from './gqls/useProgramInitialValues';
import { useCreateAffiliateProgramFragment } from './gqls/useCreateAffiliateProgram';
import { useUpdateAffiliateProgramFragment } from './gqls/useUpdateAffiliateProgram';
import { promoCodeExampleFragment } from './gqls/promoCodeExample';

// typescript definition
export interface PropsType {
  affiliateProgramId: string;
  type: 'add' | 'edit';
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

export default React.memo(({ affiliateProgramId, type }: PropsType) => {
  const { t } = useTranslation('affiliate-program');
  const [form] = Form.useForm();
  const isAdd = type === 'add';
  const { data } = useQuery<getProgramType, getProgramVariablesType>(
    getProgram,
    {
      variables: {
        id: affiliateProgramId,
        isAdd,
      },
    },
  );
  const viewer = data?.viewer || null;
  const affiliateProgram = viewer?.affiliateProgram || null;
  const programInitialValues = useProgramInitialValues(
    form,
    filter(useProgramInitialValuesFragment, affiliateProgram),
  );
  const createAffiliateProgram = useCreateAffiliateProgram(
    filter(useCreateAffiliateProgramFragment, viewer),
  );
  const updateAffiliateProgram = useUpdateAffiliateProgram(
    filter(useUpdateAffiliateProgramFragment, affiliateProgram),
  );
  const { partners, searchPartners } = useSearchPartners();
  const validatePromoCode = useValidatePromoCode();

  return (
    <Form
      form={form}
      initialValues={programInitialValues}
      onFinish={isAdd ? createAffiliateProgram : updateAffiliateProgram}
      validateTrigger="onBlur"
    >
      <Header
        title={t(`title.${type}`)}
        buttons={
          isAdd ? null : (
            <FormItem shouldUpdate noStyle>
              {({ getFieldsError, submit }) => (
                <div>
                  <Link href="/affiliate/programs">
                    <Button>{t('buttons.cancel')}</Button>
                  </Link>

                  <Button
                    onClick={submit}
                    disabled={getFieldsError()?.some(
                      ({ errors }) => errors.length,
                    )}
                    type="primary"
                  >
                    {t('buttons.save')}
                  </Button>
                </div>
              )}
            </FormItem>
          )
        }
      >
        <div className={styles.block}>
          <div className={styles.title}>{t('program-title.title')}</div>

          <FormItem
            name={['title']}
            rules={[
              {
                required: true,
                message: t('validate.required'),
              },
            ]}
          >
            <TextArea placeholder={t('program-title.placeholder')} autoSize />
          </FormItem>

          <div className={styles.date}>
            <div>
              <div className={styles.title}>
                {t('startAt.title')}

                <Tooltip title={t('startAt.tooltip')} />
              </div>

              <FormItem
                name={['startAt']}
                rules={[
                  {
                    required: true,
                    message: t('validate.required'),
                  },
                ]}
              >
                <DatePicker
                  placeholder={t('startAt.placeholder')}
                  showNow={false}
                  disabled={!isAdd}
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY/MM/DD HH:mm"
                />
              </FormItem>
            </div>

            <div>
              <div className={`${styles.title} ${styles.endAt}`}>
                <div>
                  {t('endAt.title')}

                  <Tooltip title={t('endAt.tooltip')} />
                </div>

                <FormItem
                  name={['endAtDisabled']}
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>{t('endAt.disabled')}</Checkbox>
                </FormItem>
              </div>

              <FormItem dependencies={['endAtDisabled']} noStyle>
                {({ getFieldValue }) => (
                  <FormItem
                    name={['endAt']}
                    rules={
                      getFieldValue(['endAtDisabled'])
                        ? []
                        : [
                            {
                              required: true,
                              message: t('validate.required'),
                            },
                          ]
                    }
                  >
                    <DatePicker
                      placeholder={t('endAt.placeholder')}
                      showNow={false}
                      showTime={{
                        format: 'HH:mm',
                      }}
                      disabled={getFieldValue(['endAtDisabled'])}
                      format="YYYY/MM/DD HH:mm"
                    />
                  </FormItem>
                )}
              </FormItem>
            </div>
          </div>

          <div className={styles.title}>{t('partner.title')}</div>

          <FormItem
            name={['affiliatePartner', 'id']}
            rules={[
              {
                required: true,
                message: t('validate.required'),
              },
            ]}
          >
            <Select
              className={styles.partner}
              placeholder={t('partner.placeholder')}
              onSearch={searchPartners}
              notFoundContent={
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={t('partner.empty')}
                />
              }
              disabled={!isAdd}
              showSearch
            >
              {partners.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </FormItem>

          <div className={styles.title}>
            {t('commissionRate.title')}

            <Tooltip title={t('commissionRate.tooltip')} />
          </div>

          <FormItem
            name={['commissionRate']}
            rules={[
              {
                required: true,
                message: t('validate.required'),
              },
            ]}
          >
            <InputNumber
              className={styles.commissionRate}
              formatter={value => `${value}%`}
              parser={value => value?.replace('%', '') || ''}
              disabled={!isAdd}
            />
          </FormItem>

          <div className={styles.title}>
            {t('products.title')}

            <Tooltip title={t('products.tooltip')} />
          </div>

          <FormItem name={['productsType']} noStyle>
            <Select
              className={styles.productsType}
              dropdownClassName={styles.productsTypeDropdown}
              menuItemSelectedIcon={<CheckOutlined />}
              disabled={!isAdd}
            >
              {['specify', 'all'].map(key => (
                <Option key={key} value={key}>
                  {t(`products.${key}`)}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem dependencies={['productsType']} noStyle>
            {({ getFieldValue }) =>
              getFieldValue(['productsType']) !== 'specify' ? null : (
                <FormItem
                  className={styles.products}
                  name={['products']}
                  rules={[
                    {
                      required: true,
                      message: t('validate.products-empty'),
                    },
                  ]}
                  validateTrigger="onChange"
                >
                  <Products />
                </FormItem>
              )
            }
          </FormItem>
        </div>

        <div className={styles.block}>
          <div className={styles.title}>{t('promoCode.title')}</div>

          <FormItem
            className={styles.promoCode}
            name={['promoCode']}
            rules={[
              {
                required: true,
                message: t('validate.required'),
              },
              {
                validator: validatePromoCode,
              },
            ]}
          >
            <PromoCodeInput disabled={!isAdd} />
          </FormItem>

          <FormItem dependencies={['promoCode']} noStyle>
            {({ getFieldValue }) => (
              <PromoCodeExample
                promoCode={getFieldValue(['promoCode'])}
                store={filter(
                  promoCodeExampleFragment,
                  data?.viewer?.store || null,
                )}
              />
            )}
          </FormItem>
        </div>

        {!isAdd ? null : (
          <FormItem shouldUpdate noStyle>
            {({ getFieldsError, submit }) => (
              <div className={styles.addButtons}>
                <Link href="/affiliate/programs">
                  <Button type="text">{t('buttons.cancel')}</Button>
                </Link>

                <Button
                  onClick={submit}
                  disabled={getFieldsError()?.some(
                    ({ errors }) => errors.length,
                  )}
                  type="primary"
                >
                  {t('buttons.add')}
                </Button>
              </div>
            )}
          </FormItem>
        )}
      </Header>
    </Form>
  );
});
