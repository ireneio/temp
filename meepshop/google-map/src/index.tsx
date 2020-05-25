// import
import React from 'react';

import useHeight from './hooks/useHeight';
import styles from './styles/index.less';

// graphql typescript
import { googleMapFragment } from './__generated__/googleMapFragment';

// definition
export default React.memo(({ width, height, href }: googleMapFragment) => {
  const { currentHeight, iframeRef } = useHeight({ width, height });

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
