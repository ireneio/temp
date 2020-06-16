// import
import React, { useContext, useRef, useEffect } from 'react';

import { fb as fbContext } from '@meepshop/context';

// definition
export default (href: string, fbRef: React.RefObject<HTMLDivElement>): void => {
  const { fb } = useContext(fbContext);
  const isLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!fb || !fbRef.current || !fbRef.current.parentNode) return;

    if (!isLoadedRef.current) {
      fbRef.current.removeAttribute('fb-xfbml-state');
      fbRef.current.removeAttribute('fb-iframe-plugin-query');
    }

    isLoadedRef.current = true;
    fb.XFBML.parse(fbRef.current.parentNode as HTMLDivElement);
  }, [href, fbRef, fb]);
};
