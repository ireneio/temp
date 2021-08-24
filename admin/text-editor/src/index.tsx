// typescript import
import { BraftEditorProps } from 'braft-editor';

// import
import React, { useState, useEffect } from 'react';
import { emptyFunction } from 'fbjs';

const { createEditorState, default: Editor } =
  typeof window !== 'undefined'
    ? require('./Editor')
    : {
        createEditorState: emptyFunction,
        default: React.memo(() => null),
      };

// definition
export { createEditorState };

export default React.memo((props: BraftEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return !isMounted ? null : <Editor {...props} />;
});
