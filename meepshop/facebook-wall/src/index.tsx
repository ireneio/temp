// import
import React, { useRef } from 'react';

import useFbParse from '@meepshop/utils/lib/hooks/useFbParse';

import useWidth from './hooks/useWidth';
import styles from './styles/index.less';

// graphql typescript
import { facebookWallFragment } from './gqls/__generated__/facebookWallFragment';

// definition
export default React.memo(
  ({
    href,
    justifyContent,
    showPosts,
    showFacepile,
    smallHeader,
    hideCover,
    hideCta,
  }: facebookWallFragment) => {
    const facebookWallRef = useRef<HTMLDivElement>(null);
    const width = useWidth(facebookWallRef);

    useFbParse(href, facebookWallRef);

    return (
      <div className={`${styles.root} ${styles[justifyContent]}`}>
        <div
          ref={facebookWallRef}
          className="fb-page"
          data-href={href}
          data-width={width}
          data-tabs={showPosts ? 'timeline' : ''}
          data-small-header={smallHeader}
          data-hide-cover={hideCover}
          data-hide-cta={hideCta}
          data-show-facepile={showFacepile}
          data-adapt-container-width
        />
      </div>
    );
  },
);
