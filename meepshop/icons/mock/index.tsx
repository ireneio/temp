// import
import React, { useState } from 'react';
import { Input, message } from 'antd';

import { useClipboard } from '@meepshop/hooks';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as icons from '@meepshop/icons';

import styles from './styles/index.less';

// definition
const { Search } = Input;

export default React.memo(() => {
  const [searchKey, setSearchKey] = useState('');

  useClipboard({
    target: 'li',
    text: e => e.getAttribute('data-clipboard') || '',
    success: ({ text }) => {
      message.success(
        <span>
          <span className={styles.message}> {text} </span>
          copied 🎉`
        </span>,
      );
    },
  });

  return (
    <div className={styles.root}>
      <Search onSearch={setSearchKey} />

      <ul>
        {Object.keys(icons)
          .filter(key => (!searchKey ? true : key.includes(searchKey)))
          .map(key => {
            const Icon = icons[key as keyof typeof icons];

            return (
              <li key={key} data-clipboard={`<${key} />`}>
                <Icon />

                <div>{key.replace(/Icon$/, '')}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
});
