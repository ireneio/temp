import React from 'react';

import * as styles from './styles';

/* eslint-disable react/prop-types */
export default ({ className, onClick, Icon }) => (
  <div className={className} onClick={onClick}>
    <Icon style={styles.arrow} />
  </div>
);
