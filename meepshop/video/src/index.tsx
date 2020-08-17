// import
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';

import { Fb as FbContext } from '@meepshop/context';

import useHeight from './hooks/useHeight';
import styles from './styles/index.less';

// graphql typescript
import { videoFragment } from './__generated__/videoFragment';

// definition
export default React.memo(({ id, width, ratio, href }: videoFragment) => {
  const { version, appId } = useContext(FbContext);
  const { height, videoRef } = useHeight(ratio);

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
