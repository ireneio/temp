// import
import React, { useRef, useState, useContext, useCallback } from 'react';
import { getElementPosition } from 'fbjs';

import { useEffectWithCss } from '@admin/hooks';
import { CollapsedContext } from '@admin/wrapper';

// definition
export default (): {
  rootRef: React.Ref<HTMLDivElement>;
  offset: number;
} => {
  const collapsed = useContext(CollapsedContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const checking = useCallback(() => {
    if (!rootRef.current || collapsed === null) return;

    const { x } = getElementPosition(rootRef.current);

    if (offset !== x + 25) setOffset(x + 25);
  }, [collapsed, offset]);

  useEffectWithCss(checking);

  return {
    rootRef,
    offset,
  };
};
