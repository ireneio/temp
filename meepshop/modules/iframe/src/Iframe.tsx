// import
import React from 'react';

import styles from './styles/index.less';

// graphql typescript
import { iframeFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default React.memo(({ htmlCode }: iframeFragment) => (
  <div
    className={styles.root}
    dangerouslySetInnerHTML={{
      __html: htmlCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    }}
  />
));
