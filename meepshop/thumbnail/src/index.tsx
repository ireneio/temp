// import
import React from 'react';

import { placeholderThumbnail_w120 as placeholderThumbnail } from '@meepshop/images';

import styles from './styles/index.less';

// graphql typescript
import {
  thumbnailFragment as thumbnailFragmentType,
  thumbnailFragment_scaledSrc as thumbnailFragmentScaledSrcType,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  image: thumbnailFragmentType | null;
  className?: string;
  source?: keyof thumbnailFragmentScaledSrcType;
  onClick?: () => void;
}

// definition
export default ({
  image,
  className,
  source,
  onClick,
}: PropsType): React.ReactElement => (
  <div className={`${styles.wrapper} ${className || ''}`} onClick={onClick}>
    <div
      className={styles.image}
      style={{
        backgroundImage: `url(${image?.scaledSrc?.[source || 'w120'] ||
          placeholderThumbnail})`,
      }}
    />
  </div>
);
