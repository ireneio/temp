import React from 'react';
import { Icon } from 'antd';

import * as styles from './styles';

/* eslint-disable react/prop-types */
export default ({ className, onClick, type }) => (
  <div className={className} onClick={onClick}>
    <Icon type={type} style={styles.arrow} />
  </div>
);
