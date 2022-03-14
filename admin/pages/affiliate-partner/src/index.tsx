// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Form, Input, Button } from 'antd';
import { areEqual } from 'fbjs';

import { OpenUrlIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import Link from '@meepshop/link';
import Header from '@admin/header';
import Tooltip from '@admin/tooltip';
import FormUrl from '@admin/form-url';

import usePartnerInitialValues from './hooks/usePartnerInitialValues';
import useValidatePartnerName from './hooks/useValidatePartnerName';
import useCreateAffiliatePartner from './hooks/useCreateAffiliatePartner';
import useUpdateAffiliatePartner from './hooks/useUpdateAffiliatePartner';
import styles from './styles/index.less';

// graphql typescript
import {
  getPartner as getPartnerType,
  getPartnerVariables as getPartnerVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getPartner } from './gqls';
import { usePartnerInitialValuesFragment } from './gqls/usePartnerInitialValues';
import { useUpdateAffiliatePartnerFragment } from './gqls/useUpdateAffiliatePartner';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  affiliatePartnerId: string;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

const AffiliatePartner: NextPage<PropsType> = React.memo(
  ({ affiliatePartnerId }) => {
    const { t } = useTranslation('affiliate-partner');
    const [form] = Form.useForm();
    const { data } = useQuery<getPartnerType, getPartnerVariablesType>(
      getPartner,
      {
        variables: { id: affiliatePartnerId },
        skip: affiliatePartnerId === 'add',
      },
    );
    const affiliatePartner = data?.viewer?.affiliatePartner || null;
    const partnerInitialValues = usePartnerInitialValues(
      form,
      filter(usePartnerInitialValuesFragment, affiliatePartner),
    );
    const createAffiliatePartner = useCreateAffiliatePartner();
    const updateAffiliatePartner = useUpdateAffiliatePartner(
      filter(useUpdateAffiliatePartnerFragment, affiliatePartner),
    );
    const validateEmail = useValidateEmail(true);
    const validatePartnerName = useValidatePartnerName();

    return (
      <Form
        form={form}
        initialValues={partnerInitialValues}
        validateTrigger="onBlur"
        onFinish={
          affiliatePartnerId === 'add'
            ? createAffiliatePartner
            : updateAffiliatePartner
        }
      >
        <Header
          title={t(affiliatePartnerId === 'add' ? 'title.add' : 'title.info')}
          prevTitle={t('prev-title')}
          buttons={
            affiliatePartnerId === 'add' ? null : (
              <FormItem shouldUpdate noStyle>
                {({ getFieldsValue, getFieldsError, resetFields, submit }) =>
                  areEqual(partnerInitialValues, getFieldsValue()) ? null : (
                    <div>
                      <Button onClick={() => resetFields()}>
                        {t('buttons.cancel')}
                      </Button>

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
                  )
                }
              </FormItem>
            )
          }
          backTo="/affiliate/partners"
        >
          <div className={styles.root}>
            <div className={styles.title}>{t('name.title')}</div>

            <FormItem
              name={['name']}
              rules={[
                {
                  required: true,
                  message: t('validate.required'),
                },
                {
                  validator: validatePartnerName,
                },
              ]}
            >
              <TextArea placeholder={t('name.placeholder')} autoSize />
            </FormItem>

            <div className={styles.title}>{t('email.title')}</div>

            <FormItem
              name={['email']}
              normalize={validateEmail.normalize}
              rules={[
                {
                  validator: validateEmail.validator,
                },
              ]}
            >
              <Input placeholder={t('email.placeholder')} />
            </FormItem>

            <div className={styles.title}>{t('phone.title')}</div>

            <FormItem name={['phone']}>
              <Input placeholder={t('phone.placeholder')} />
            </FormItem>

            <div className={styles.title}>{t('lineId.title')}</div>

            <FormItem name={['lineId']}>
              <Input placeholder={t('lineId.placeholder')} />
            </FormItem>

            {['facebookUrl', 'instagramUrl'].map(key => (
              <React.Fragment key={key}>
                <div className={styles.title}>
                  {t(`${key}.title`)}

                  <FormItem dependencies={[key]} noStyle>
                    {({ getFieldError, getFieldValue }) => {
                      const link = getFieldValue([key]);

                      return getFieldError([key]).length !== 0 ||
                        !link ? null : (
                        <Tooltip title={t('open-url')}>
                          <span className={styles.openUrl}>
                            <Link href={link} target="_blank">
                              <OpenUrlIcon />
                            </Link>
                          </span>
                        </Tooltip>
                      );
                    }}
                  </FormItem>
                </div>

                <FormUrl name={[key]} placeholder={t(`${key}.placeholder`)} />
              </React.Fragment>
            ))}

            <div className={styles.title}>{t('address.title')}</div>

            <FormItem name={['address']}>
              <Input placeholder={t('address.placeholder')} />
            </FormItem>

            <div className={styles.title}>{t('memo.title')}</div>

            <FormItem name={['memo']}>
              <TextArea
                className={styles.memo}
                placeholder={t('memo.placeholder')}
              />
            </FormItem>
          </div>

          {affiliatePartnerId !== 'add' ? null : (
            <FormItem shouldUpdate noStyle>
              {({ getFieldsValue, getFieldsError, resetFields, submit }) =>
                areEqual(partnerInitialValues, getFieldsValue()) ? null : (
                  <div className={styles.addButtons}>
                    <Button onClick={() => resetFields()} type="text">
                      {t('buttons.cancel')}
                    </Button>

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
                )
              }
            </FormItem>
          )}
        </Header>
      </Form>
    );
  },
);

AffiliatePartner.getInitialProps = async ({
  query: { affiliatePartnerId },
}) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof affiliatePartnerId !== 'string')
    throw new Error('[FIXME] affiliatePartnerId is undefined');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    affiliatePartnerId,
  };
};

export default AffiliatePartner;
