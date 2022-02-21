// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';

import styles from './styles/line.less';

// graphql typescript
import { lineLineLoginSettingFragment as lineLineLoginSettingFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  lineSetting: lineLineLoginSettingFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ lineSetting: { channelId, channelSecret } }: PropsType) => {
    const { t } = useTranslation('setting-third-party');

    return (
      <div className={styles.root}>
        {(['channelId', 'channelSecret'] as const).map(key => (
          <div key={key}>
            <div className={styles.title}>
              {t(`line.${key}.title`)}
              <Tooltip
                title={
                  <a
                    href="https://supportmeepshop.com/knowledgebase/linelogin/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('line.tooltip')}
                  </a>
                }
                iconClassName={styles.tip}
              />
            </div>

            <FormItem
              name={['line', key]}
              initialValue={
                {
                  channelId,
                  channelSecret,
                }[key]
              }
              rules={[{ required: true, message: t('required') }]}
              validateTrigger="onBlur"
              preserve
            >
              <Input placeholder={t(`line.${key}.placeholder`)} />
            </FormItem>
          </div>
        ))}
      </div>
    );
  },
);
