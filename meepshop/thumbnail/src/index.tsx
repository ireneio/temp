// import
import React from 'react';

import { placeholderThumbnail_w120 as placeholderThumbnail } from '@meepshop/images';

import styles from './styles/index.less';

// graphql typescript
import { thumbnailFragment } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  image: thumbnailFragment | null;
  className?: string;
}

// definition
export default ({ image, className }: PropsType): React.ReactElement => (
  <div className={`${styles.wrapper} ${className || ''}`}>
    <div
      className={styles.image}
      style={{
        backgroundImage: `url(${image?.scaledSrc?.w120 ||
          placeholderThumbnail})`,
      }}
    />
  </div>
);
