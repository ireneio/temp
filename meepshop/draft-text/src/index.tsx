// import
import React from 'react';

import { useRawContent, useHtml } from '@meepshop/hooks';

import styles from './styles/index.less';

// graphql typescript
import { draftTextFragment } from './gqls/__generated__/draftTextFragment';

// definition
export default React.memo(({ content }: draftTextFragment) => {
  const rawContent = useRawContent(content);
  const html = useHtml(rawContent);

  return (
    <div
      className={styles.root}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
});
