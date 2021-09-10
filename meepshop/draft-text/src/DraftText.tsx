// import
import React from 'react';
import { convertRawToEditorState } from 'braft-convert';

import useRawContent from './hooks/useRawContent';
import useHtml from './hooks/useHtml';
import styles from './styles/index.less';

// graphql typescript
import { draftTextFragment } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType extends draftTextFragment {
  className?: string;
  usePlainText?: boolean;
}

// definition
export default React.memo(({ className, content, usePlainText }: PropsType) => {
  const rawContent = useRawContent(content);
  const html = useHtml(rawContent);

  if (usePlainText)
    return !rawContent ? null : (
      <>
        {convertRawToEditorState(rawContent)
          .getCurrentContent()
          .getPlainText()}
      </>
    );

  return (
    <div
      className={`${styles.root} ${className || ''}`}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
});
