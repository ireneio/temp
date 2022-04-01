// import
import React from 'react';

import filter from '@meepshop/utils/lib/filter';

import useHeight from './hooks/useHeight';
import styles from './styles/index.less';

// graphql typescript
import { googleMapFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import { useHeightFragment } from './gqls/useHeight';

// definition
export default React.memo(({ width, href, ...props }: googleMapFragment) => {
  const { currentHeight, iframeRef } = useHeight(
    filter(useHeightFragment, { ...props, width }),
  );

  return (
    <iframe
      ref={iframeRef}
      className={styles.root}
      style={{
        maxWidth: `${width}px`,
        height: `${currentHeight}px`,
      }}
      src={href}
      title="google map"
      allowFullScreen
    />
  );
});
