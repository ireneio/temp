// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Tooltip from '@admin/tooltip';

import styles from './styles/facebook.less';

// graphql typescript
import { facebookFacebookSettingFragment as facebookFacebookSettingFragmentType } from './__generated__/facebookFacebookSettingFragment';

// typescript definition
interface PropsType extends FormComponentProps {
  facebookSetting: facebookFacebookSettingFragmentType;
}

// definition
const { Item: FormItem } = Form;

export const facebookFacebookSettingFragment = gql`
  fragment facebookFacebookSettingFragment on FacebookSetting {
    appId
    appSecret
  }
`;

export default React.memo(
  ({
    form: { getFieldDecorator },
    facebookSetting: { appId, appSecret },
  }: PropsType) => {
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

              <FormItem>
                {getFieldDecorator(`facebook.${key}`, {
                  initialValue: {
                    appId,
                    appSecret,
                  }[key],
                  rules: [{ required: true, message: t('required') }],
                  validateTrigger: 'onBlur',
                  preserve: true,
                })(<Input placeholder={t(`facebook.${key}.placeholder`)} />)}
              </FormItem>
            </div>
          ))}
        </div>
      </>
    );
  },
);
