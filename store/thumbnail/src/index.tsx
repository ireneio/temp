// import
import React from 'react';

import Placeholder from '@store/placeholder';

import styles from './styles/index.less';

// typescript definition
interface PropType {
  imgUrl?: string | null;
}

// definition
export default ({ imgUrl }: PropType) => (
  <div className={styles.wrapper}>
    {!imgUrl ? (
      <Placeholder />
    ) : (
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${imgUrl}?w=80)` }}
      />
    )}
  </div>
);
