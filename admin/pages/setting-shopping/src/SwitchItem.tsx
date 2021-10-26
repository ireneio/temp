// import
import React from 'react';
import { Form, Switch } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/switchItem.less';

// typescript definition
interface PropsType {
  name: string[];
  disabledDescription?: boolean;
  children?: React.ReactNode;
}

// definition
const { Item: FromItem } = Form;

export default React.memo(
  ({ name, disabledDescription, children }: PropsType) => {
    const { t } = useTranslation('setting-shopping');

    return (
      <div className={styles.item}>
        <FromItem
          className={styles.switchItem}
          name={name}
          valuePropName="checked"
        >
          <Switch />
        </FromItem>

        <div>
          <h4 className={styles.h4}>{t(`${name.join('.')}.title`)}</h4>
          {disabledDescription ? null : (
            <p className={styles.p}>{t(`${name.join('.')}.desc`)}</p>
          )}

          {!children ? null : (
            <FromItem noStyle dependencies={[name]}>
              {({ getFieldValue }) => (!getFieldValue(name) ? null : children)}
            </FromItem>
          )}
        </div>
      </div>
    );
  },
);
