// typescript import
import { I18nPropsType } from '@meepshop/locales';

// import
import React from 'react';
import { Input } from 'antd';

import { withTranslation } from '@meepshop/locales';

import styles from './styles/replaceForm.less';

// typescript definition
export interface PropsType extends I18nPropsType {
  recipient: {
    name: string;
    mobile: string;
    address: string;
  };
  onChange: (value: PropsType['recipient']) => void;
}

// definition
export default withTranslation('member-order-apply')(
  React.memo(({ t, recipient, onChange }: PropsType) => (
    <div className={styles.root}>
      <h3>{t('recipient.title')}</h3>

      {[
        {
          key: 'name',
          placeholder: t('recipient.name'),
        },
        {
          key: 'mobile',
          placeholder: t('recipient.mobile'),
        },
        {
          key: 'address',
          placeholder: t('recipient.address'),
        },
      ].map(
        ({
          key,
          placeholder,
        }: {
          key: keyof PropsType['recipient'];
          placeholder: string;
        }) => (
          <Input
            key={key}
            placeholder={placeholder}
            value={recipient[key]}
            onChange={({ target: { value } }) =>
              onChange({
                ...recipient,
                [key]: value,
              })
            }
            size="large"
          />
        ),
      )}
    </div>
  )),
);
