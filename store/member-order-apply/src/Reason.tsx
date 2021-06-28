// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/reason.less';

// typescript definition
interface PropsType {
  id: string;
  checking: boolean;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ id, checking }: PropsType) => {
  const { t } = useTranslation('member-order-apply');
  const name = ['reason', id];

  return (
    <>
      <FormItem name={name} hidden={checking} noStyle>
        <Input className={styles.root} placeholder={t('reason')} />
      </FormItem>

      {!checking ? null : (
        <FormItem shouldUpdate noStyle>
          {({ getFieldValue }) => (
            <div className={styles.root}>{getFieldValue(name)}</div>
          )}
        </FormItem>
      )}
    </>
  );
});
