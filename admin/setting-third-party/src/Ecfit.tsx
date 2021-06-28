// import
import React from 'react';
import { Form, Select, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';

import styles from './styles/ecfit.less';

// graphql typescript
import { ecfitFragment as ecfitFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  storeEcfitSettings: ecfitFragmentType;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

export default React.memo(
  ({
    storeEcfitSettings: { serviceType, companyToken, apiKey },
  }: PropsType) => {
    const { t } = useTranslation('setting-third-party');

    return (
      <>
        <div className={styles.title}>{t('ecfit.serviceType.title')}</div>

        <FormItem
          name={['ecfit', 'serviceType']}
          initialValue={serviceType}
          rules={[{ required: true, message: t('required') }]}
          validateTrigger="onBlur"
          preserve
        >
          <Select>
            {['INTERTIDAL', 'THIRD_PARTY_STORAGE'].map(key => (
              <Option key={key} value={key}>
                {t(`ecfit.serviceType.${key}`)}
              </Option>
            ))}
          </Select>
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

              <FormItem
                name={['ecfit', key]}
                initialValue={
                  {
                    companyToken,
                    apiKey,
                  }[key]
                }
                rules={[{ required: true, message: t('required') }]}
                validateTrigger="onBlur"
                preserve
              >
                <Input placeholder={t(`ecfit.${key}.placeholder`)} />
              </FormItem>
            </div>
          ))}
        </div>
      </>
    );
  },
);
