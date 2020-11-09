// import
import React, { useContext, useRef } from 'react';
import ReactPlayer from 'react-player';

import { Fb as FbContext } from '@meepshop/context';
import { useFbParse } from '@meepshop/hooks';

import useHeight from './hooks/useHeight';
import styles from './styles/index.less';

// graphql typescript
import { videoFragment } from './__generated__/videoFragment';

// definition
export default React.memo(({ id, width, ratio, href }: videoFragment) => {
  const { version, appId } = useContext(FbContext);
  const { height, videoRef } = useHeight(ratio);
  const fbRef = useRef(null);

  fbRef.current = /facebook/.test(href)
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore react-player typescript error
      videoRef.current?.wrapper.childNodes[0]
    : null;
  useFbParse(href, fbRef);

  return (
    <ReactPlayer
      ref={videoRef}
      className={styles.root}
      url={href}
      width={`${width}%`}
      height={`${height}px`}
      config={{
        facebook: {
          version,
          appId,
          playerId: id,
        },
      }}
      controls
    />
  );
});
