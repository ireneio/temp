// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Form, Select, Input } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Tooltip from '@admin/tooltip';

import styles from './styles/ecfit.less';

// graphql typescript
import { ecfitFragment as ecfitFragmentType } from './__generated__/ecfitFragment';

// typescript definition
interface PropsType extends FormComponentProps {
  storeEcfitSettings: ecfitFragmentType;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

export const ecfitFragment = gql`
  fragment ecfitFragment on StoreEcfitSettings {
    serviceType
    companyToken
    apiKey
  }
`;

export default React.memo(
  ({
    form: { getFieldDecorator },
    storeEcfitSettings: { serviceType, companyToken, apiKey },
  }: PropsType) => {
    const { t } = useTranslation('setting-third-party');

    return (
      <>
        <div className={styles.title}>{t('ecfit.serviceType.title')}</div>

        <FormItem>
          {getFieldDecorator('ecfit.serviceType', {
            initialValue: serviceType,
            rules: [{ required: true, message: t('required') }],
            validateTrigger: 'onBlur',
            preserve: true,
          })(
            <Select>
              {['INTERTIDAL', 'THIRD_PARTY_STORAGE'].map(key => (
                <Option key={key} value={key}>
                  {t(`ecfit.serviceType.${key}`)}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>

        <div className={styles.horizontal}>
          {['companyToken', 'apiKey'].map((key: 'companyToken' | 'apiKey') => (
            <div key={key}>
              <div className={styles.title}>
                {t(`ecfit.${key}.title`)}

                <Tooltip
                  title={t(`ecfit.${key}.tip`)}
                  iconClassName={styles.tip}
                />
              </div>

              <FormItem>
                {getFieldDecorator(`ecfit.${key}`, {
                  initialValue: {
                    companyToken,
                    apiKey,
                  }[key],
                  rules: [{ required: true, message: t('required') }],
                  validateTrigger: 'onBlur',
                  preserve: true,
                })(<Input placeholder={t(`ecfit.${key}.placeholder`)} />)}
              </FormItem>
            </div>
          ))}
        </div>
      </>
    );
  },
);
