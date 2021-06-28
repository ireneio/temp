// import
import React from 'react';
import { Form, Input, Divider } from 'antd';
import get from 'lodash.get';

import { useTranslation } from '@meepshop/locales';
import Block from '@admin/block';

import ChangePassword from './ChangePassword';

import styles from './styles/account.less';

// graphql typescript
import { accountFragment as accountFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: accountFragmentType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('account-setting');

  return (
    <Block title={t('account.title')} description={t('account.description')}>
      <div className={styles.root}>
        <div>{t('account.account')}</div>

        <div>{viewer?.email}</div>

        <ChangePassword />

        <Divider />

        {[
          ['name'],
          ['additionalInfo', 'mobile'],
          ['additionalInfo', 'tel'],
        ].map((name: string[]) => {
          const key = name.join('.');

          return (
            <React.Fragment key={key}>
              <div className={styles.title}>{t(`account.${key}.label`)}</div>

              <FormItem initialValue={get(viewer, name)} name={name}>
                <Input placeholder={t(`account.${key}.placeholder`)} />
              </FormItem>
            </React.Fragment>
          );
        })}
      </div>
    </Block>
  );
});
