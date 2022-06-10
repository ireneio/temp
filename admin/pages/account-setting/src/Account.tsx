// import
import React from 'react';
import { Form, Input, Divider } from 'antd';

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

        {['name', 'mobile', 'tel'].map((name: string) => {
          return (
            <React.Fragment key={name}>
              <div className={styles.title}>{t(`account.${name}.label`)}</div>

              <FormItem name={name}>
                <Input placeholder={t(`account.${name}.placeholder`)} />
              </FormItem>
            </React.Fragment>
          );
        })}
      </div>
    </Block>
  );
});
