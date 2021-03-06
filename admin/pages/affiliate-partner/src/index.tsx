// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { Form, Input, Button } from 'antd';
import { areEqual } from 'fbjs';
import { isUUID } from 'validator';

import { OpenUrlIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import Email from '@meepshop/form-email';
import filter from '@meepshop/utils/lib/filter';
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
import { useCreateAffiliatePartnerFragment } from './gqls/useCreateAffiliatePartner';
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
    const isAdd = affiliatePartnerId === 'add';
    const { data } = useQuery<getPartnerType, getPartnerVariablesType>(
      getPartner,
      {
        variables: {
          id: affiliatePartnerId,
          isAdd,
        },
      },
    );
    const viewer = data?.viewer || null;
    const affiliatePartner = viewer?.affiliatePartner || null;
    const partnerInitialValues = usePartnerInitialValues(
      form,
      filter(usePartnerInitialValuesFragment, affiliatePartner),
    );
    const createAffiliatePartner = useCreateAffiliatePartner(
      filter(useCreateAffiliatePartnerFragment, viewer),
    );
    const updateAffiliatePartner = useUpdateAffiliatePartner(
      filter(useUpdateAffiliatePartnerFragment, affiliatePartner),
    );
    const validatePartnerName = useValidatePartnerName(
      isAdd ? null : affiliatePartner?.name || null,
    );

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
          {...(affiliatePartnerId === 'add'
            ? {
                title: t('title.add'),
                disableAffix: true,
              }
            : {
                title: t('title.info'),
                prevTitle: t('prev-title'),
                backTo: '/affiliate/partners',
                buttons: (
                  <FormItem shouldUpdate noStyle>
                    {({
                      getFieldsValue,
                      getFieldsError,
                      resetFields,
                      submit,
                    }) =>
                      areEqual(
                        partnerInitialValues,
                        getFieldsValue(),
                      ) ? null : (
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
                ),
              })}
          maxWidth="720px"
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

            <Email
              name={['email']}
              placeholder={t('email.placeholder')}
              isNotShopper
              disableRequired
            />

            <div className={styles.title}>{t('phone.title')}</div>

            <FormItem name={['phone']}>
              <Input placeholder={t('phone.placeholder')} />
            </FormItem>

            <div className={styles.title}>{t('lineId.title')}</div>

            <FormItem name={['lineId']}>
              <Input placeholder={t('lineId.placeholder')} />
            </FormItem>

            {(['facebookUrl', 'instagramUrl'] as const).map(key => (
              <React.Fragment key={key}>
                <div className={styles.title}>
                  {t(`${key}.title`)}

                  <FormItem dependencies={[key]} noStyle>
                    {({ getFieldError, getFieldValue }) => {
                      const url = getFieldValue([key]);
                      const link =
                        !url || /(https?:)?\/\//.test(url)
                          ? url
                          : `https://${url}`;

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

                <FormUrl
                  name={[key]}
                  placeholder={t(`${key}.placeholder`)}
                  options={
                    /* eslint-disable @typescript-eslint/camelcase */
                    {
                      facebookUrl: {
                        require_host: true,
                        host_whitelist: ['facebook.com', 'www.facebook.com'],
                      },
                      instagramUrl: {
                        require_host: true,
                        host_whitelist: ['instagram.com', 'www.instagram.com'],
                      },
                    }[key]
                    /* eslint-enable @typescript-eslint/camelcase */
                  }
                />
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
              {({ getFieldsError, submit }) => (
                <div className={styles.addButtons}>
                  <Link href="/affiliate/partners">
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
  },
);

AffiliatePartner.getInitialProps = async ({
  query: { affiliatePartnerId },
}) => {
  // FIXME: should use get getServerSideProps return notFound
  if (
    typeof affiliatePartnerId !== 'string' ||
    (!isUUID(affiliatePartnerId) && affiliatePartnerId !== 'add')
  )
    throw new Error('[FIXME] affiliatePartnerId is invalid');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    affiliatePartnerId,
  };
};

export default AffiliatePartner;
