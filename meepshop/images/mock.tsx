// import
import React, { useState, useEffect } from 'react';
import { Input, message } from 'antd';
import Clipboard from 'clipboard';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as images from '@meepshop/images';

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
        {Object.keys(images)
          .filter(key => (!searchKey ? true : key.includes(searchKey)))
          .map(key => (
            <li key={key} data-clipboard={key}>
              <img src={images[key]} alt={key} />

              <div>{key}</div>
            </li>
          ))}
      </ul>
    </div>
  );
});
