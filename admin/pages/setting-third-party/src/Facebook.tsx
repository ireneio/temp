// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';

import styles from './styles/facebook.less';

// graphql typescript
import { facebookFragment as facebookFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  facebookSetting: facebookFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ facebookSetting: { appId, appSecret } }: PropsType) => {
    const { t } = useTranslation('setting-third-party');

    return (
      <>
        <div className={styles.header}>
          {t('facebook.sub-title.title')}

          <Tooltip
            title={t('facebook.sub-title.tip')}
            iconClassName={styles.tip}
          />
        </div>

        <div className={styles.horizontal}>
          {['appId', 'appSecret'].map((key: 'appId' | 'appSecret') => (
            <div key={key}>
              <div className={styles.title}>{t(`facebook.${key}.title`)}</div>

              <FormItem
                name={['facebook', key]}
                initialValue={
                  {
                    appId,
                    appSecret,
                  }[key]
                }
                rules={[{ required: true, message: t('required') }]}
                validateTrigger="onBlur"
                preserve
              >
                <Input placeholder={t(`facebook.${key}.placeholder`)} />
              </FormItem>
            </div>
          ))}
        </div>
      </>
    );
  },
);
