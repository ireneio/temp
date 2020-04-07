// import
import React, { useState, useEffect } from 'react';
import { Input, message } from 'antd';
import Clipboard from 'clipboard';

import * as icons from '@meepshop/icons';

import styles from './mock.less';

// definition
const { Search } = Input;

export default React.memo(() => {
  const [searchKey, setSearchKey] = useState(null);

  useEffect(() => {
    const clipboard = new Clipboard('li', {
      text: e => e.getAttribute('data-clipboard'),
    }).on('success', ({ text }) => {
      message.success(
        <span>
          <span className={styles.message}> {text} </span>
          copied 🎉`
        </span>,
      );
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <div className={styles.root}>
      <Search onSearch={setSearchKey} />

      <ul>
        {Object.keys(icons)
          .filter(key => (!searchKey ? true : key.includes(searchKey)))
          .map(key => {
            const Icon = icons[key];

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
