// import
import { useState, useRef, useCallback, useEffect } from 'react';

import { useEffectWithCss } from '@admin/hooks';

// definition
export default (
  editVisible: boolean,
  title?: string | null,
): {
  titleRef: React.Ref<HTMLDivElement>;
  isOverflow: boolean;
} => {
  const [isOverflow, setIsOverflow] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const checking = useCallback(() => {
    setIsOverflow(
      Boolean(
        title &&
          titleRef.current &&
          titleRef.current.scrollWidth > titleRef.current.clientWidth,
      ),
    );
  }, [title]);

  useEffect(checking, [editVisible]);
  useEffectWithCss(checking);

  return {
    titleRef,
    isOverflow,
  };
};
