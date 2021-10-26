// import
import React from 'react';
import { Form, Divider } from 'antd';

import Block from '@admin/block';
import TextEditor from '@admin/text-editor';
import { useTranslation } from '@meepshop/locales';

import SwitchItem from './SwitchItem';
import useValidateShopperLoginMessage from './hooks/useValidateShopperLoginMessage';
import styles from './styles/accessibiltiy.less';

// definition
const { Item: FormItem } = Form;

export default React.memo(() => {
  const { t } = useTranslation('setting-shopping');
  const validateShopperLoginMessage = useValidateShopperLoginMessage();

  return (
    <Block
      title={t('accessibility.title')}
      description={t('accessibility.desc')}
    >
      <SwitchItem name={['setting', 'backToTopButtonEnabled']} />

      <Divider />

      <SwitchItem
        name={['setting', 'shopperLoginMessageEnabled']}
        disabledDescription
      />
      <div className={styles.callout}>{t('accessibility.1.desc')}</div>

      <FormItem
        className={styles.shopperLoginMessage}
        name={['setting', 'shopperLoginMessage']}
        rules={[
          {
            validator: validateShopperLoginMessage,
          },
        ]}
      >
        <TextEditor />
      </FormItem>
    </Block>
  );
});
