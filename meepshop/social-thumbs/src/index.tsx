// import
import React from 'react';

import useFbParse from './hooks/useFbParse';
import styles from './styles/index.less';

// graphql typescript
import { socialThumbsFragment } from './__generated__/socialThumbsFragment';

// definition
export default React.memo(({ href, justifyContent }: socialThumbsFragment) => {
  const socialThumbsRef = useFbParse(href);

  return (
    <div className={`${styles.root} ${styles[justifyContent]}`}>
      <div
        ref={socialThumbsRef}
        className="fb-like"
        data-href={href}
        data-layout="button"
        data-action="like"
        data-size="small"
        data-show-faces="false"
        data-share
      />
    </div>
  );
});
