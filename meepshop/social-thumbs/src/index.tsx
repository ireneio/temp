// import
import React, { useRef } from 'react';

import useFbParse from '@meepshop/utils/lib/hooks/useFbParse';

import styles from './styles/index.less';

// graphql typescript
import { socialThumbsFragment } from './__generated__/socialThumbsFragment';

// definition
export default React.memo(({ href, justifyContent }: socialThumbsFragment) => {
  const socialThumbsRef = useRef<HTMLDivElement>(null);

  useFbParse(href, socialThumbsRef);

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
