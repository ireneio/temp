import React from 'react';

import { contextProvider } from 'context';

import * as styles from './styles/notFound.less';

const { enhancer } = contextProvider('user');

export default enhancer(({ user }) => (
  <div className={styles.root}>
    <h4>{`Hi, ${user?.name || ''} (${user.email})`}</h4>

    <h1>無此訂單，請確認是否登入正確的帳號。</h1>
  </div>
));
