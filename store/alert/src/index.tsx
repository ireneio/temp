// typescript import
import { AlertProps } from 'antd/lib/alert';

// import
import React from 'react';
import { Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from './styles/index.less';

// definition
export default React.memo(({ type, ...props }: AlertProps) => (
  <Alert
    {...props}
    className={styles.root}
    type={type}
    icon={
      ['warning', 'error'].includes(type || '') ? (
        <ExclamationCircleOutlined />
      ) : null
    }
  />
));
