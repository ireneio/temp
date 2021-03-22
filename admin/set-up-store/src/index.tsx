// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// graphql typescript
import {
  isStoreCnameUsable,
  isStoreCnameUsableVariables,
} from '@meepshop/types/gqls/admin';

// import
import React, { useContext, useEffect } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import { Form, Input, Select, Button, Icon } from 'antd';

import Tooltip from '@admin/tooltip';
import { AdTrackContext } from '@admin/ad-track';
import { useTranslation } from '@meepshop/locales';
import { meepshopLogo, loginBackground } from '@meepshop/images';

import useApplicantInitiatesStore from './hooks/useApplicantInitiatesStore';

import styles from './styles/index.less';

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const SetUpStore: NextPage = Form.create<FormComponentProps>()(
  React.memo(({ form, form: { getFieldDecorator } }: FormComponentProps) => {
    const client = useApolloClient();
    const { t } = useTranslation('set-up-store');
    const adTrack = useContext(AdTrackContext);
    const { loading, applicantInitiatesStore } = useApplicantInitiatesStore(
      form,
    );

    useEffect(() => {
      adTrack.custom('點擊', '月租註冊_驗證成功', '月租註冊');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        className={styles.root}
        style={{ backgroundImage: `url('${loginBackground}')` }}
      >
        <div className={styles.wrapper}>
          <img src={meepshopLogo} alt="Meepshop" />

          <div>{t('title')}</div>
          <div>{t('description')}</div>

          <div className={styles.label}>
            {t('cname.label')}
            <Tooltip title={t('cname.tooltip')} />
          </div>
          <FormItem>
            {getFieldDecorator('cname', {
              rules: [
                {
                  required: true,
                  message: t('cname.error'),
                },
                {
                  pattern: /^[a-z0-9-]{4,20}$/,
                  message: t('cname.error'),
                },
                {
                  validator: async (_, cname, callback) => {
                    const {
                      data: {
                        isStoreCnameUsable: { result },
                      },
                    } = await client.query<
                      isStoreCnameUsable,
                      isStoreCnameUsableVariables
                    >({
                      query: gql`
                        query isStoreCnameUsable($cname: String!) {
                          isStoreCnameUsable(cname: $cname) {
                            result
                          }
                        }
                      `,
                      variables: { cname },
                    });

                    if (result === 'OK') callback();
                    else if (result === 'INVALID_FORMAT')
                      callback(t('cname.error'));
                    else callback(t('cname.cname-has-been-used'));
                  },
                },
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder={t('cname.placeholder')}
                size="large"
                suffix=".new.meepshop.com"
              />,
            )}
          </FormItem>

          <div className={styles.label}>
            {t('currency.label')}
            <Tooltip title={t('currency.tooltip')} />
          </div>
          <FormItem>
            {getFieldDecorator('currency', {
              initialValue: 'TWD',
            })(
              <Select size="large">
                {['TWD', 'JPY', 'USD', 'VND', 'EUR'].map(key => (
                  <Option key={key} value={key}>
                    {key} {t(`currency.${key}`)}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <Button
            loading={loading}
            type="primary"
            size="large"
            onClick={applicantInitiatesStore}
          >
            {t('create-store')}
          </Button>

          <span>
            <Icon type="exclamation-circle" />
            {t('can-not-change-after-setting')}
          </span>
        </div>
      </div>
    );
  }),
);

SetUpStore.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SetUpStore;
