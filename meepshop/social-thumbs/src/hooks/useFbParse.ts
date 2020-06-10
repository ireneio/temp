// import
import React, { useContext, useRef, useEffect } from 'react';

import { fb as fbContext } from '@meepshop/context';

// graphql typescript
import { socialThumbsFragment } from '../__generated__/socialThumbsFragment';

// definition
export default (
  href: socialThumbsFragment['href'],
): React.Ref<HTMLDivElement> => {
  const { fb } = useContext(fbContext);
  const socialThumbsRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!fb || !socialThumbsRef.current || !socialThumbsRef.current.parentNode)
      return;

    if (!isLoadedRef.current) {
      socialThumbsRef.current.removeAttribute('fb-xfbml-state');
      socialThumbsRef.current.removeAttribute('fb-iframe-plugin-query');
    }

    isLoadedRef.current = true;
    fb.XFBML.parse(socialThumbsRef.current.parentNode as HTMLDivElement);
  }, [href, fb]);

  return socialThumbsRef;
};
