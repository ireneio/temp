// import
import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/recipientComment.less';

// graphql typescript
import { recipientCommentFragment as recipientCommentFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  recipientComment: recipientCommentFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default React.memo(({ recipientComment }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('notes')}</div>

      {!recipientComment?.placeHolder ? null : (
        <div className={styles.placeHolder}>{recipientComment.placeHolder}</div>
      )}

      <FormItem
        name={['notes']}
        rules={[
          !recipientComment?.isRequired
            ? {}
            : {
                required: true,
                message: t('is-required'),
              },
        ]}
        validateTrigger="onBlur"
      >
        <TextArea placeholder={t('notes-placeholder')} rows={4} />
      </FormItem>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.placeHolder} {
              color: ${transformColor(colors[3]).alpha(0.9)};
              border-color: ${transformColor(colors[3]).alpha(0.8)}
            }
            .${styles.root} .ant-input::placeholder{
              color: ${transformColor(colors[3]).alpha(0.4)};
            }
          `,
        }}
      />
    </div>
  );
});
