// import
import React from 'react';

import useRawContent from '@meepshop/utils/lib/hooks/useRawContent';
import useHtml from '@meepshop/utils/lib/hooks/useHtml';
import styles from './styles/index.less';

// graphql typescript
import { draftTextFragment } from './__generated__/draftTextFragment';

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
