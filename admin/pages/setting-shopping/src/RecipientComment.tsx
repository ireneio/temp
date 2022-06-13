// import
import React from 'react';
import { Radio, Form, Input } from 'antd';

import Block from '@admin/block';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/recipientComment.less';

// definition
const { Item: FormItem } = Form;
const { Group } = Radio;
const { TextArea } = Input;

export default React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting-shopping');

    return (
      <Block
        title={t('recipientComment.title')}
        description={t('recipientComment.desc')}
      >
        <>
          <h2 className={styles.h2}>{t('recipientComment.subTitle')}</h2>
          <h3 className={styles.h3}>{t('recipientComment.0.title')}</h3>
          <FormItem
            noStyle
            name={['setting', 'order', 'recipientComment', 'isRequired']}
          >
            <Group
              className={styles.group}
              options={[
                {
                  value: false,
                  label: t('recipientComment.0.optional'),
                },
                {
                  value: true,
                  label: t('recipientComment.0.required'),
                },
              ]}
            />
          </FormItem>
          <h3 className={styles.h3}>{t('recipientComment.1.title')}</h3>
          <FormItem
            noStyle
            name={['setting', 'order', 'recipientComment', 'placeHolder']}
          >
            <TextArea
              className={styles.textArea}
              rows={3}
              placeholder={t('recipientComment.1.placeholder')}
            />
          </FormItem>
        </>
      </Block>
    );
  },
);
