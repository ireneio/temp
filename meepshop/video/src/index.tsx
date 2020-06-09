// import
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';

import { fb as fbContext } from '@meepshop/context';

import useHeight from './hooks/useHeight';
import styles from './styles/index.less';

// graphql typescript
import { videoFragment } from './__generated__/videoFragment';

// definition
export default React.memo(({ width, ratio, href }: videoFragment) => {
  const { version, appId } = useContext(fbContext);
  const { height, videoRef } = useHeight(ratio);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore FIXME: can not use useRef to class component ref
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
        },
      }}
      controls
    />
  );
});
