// import
import React from 'react';

import { placeholderThumbnail_w60 as placeholderThumbnail } from '@meepshop/images';

import styles from './styles/index.less';

// graphql typescript
import { thumbnailFragment as thumbnailFragmentType } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  image: thumbnailFragmentType | null;
  size: 28 | 40 | 48;
  className?: string;
  onClick?: () => void;
}

// definition
export default ({
  image,
  size,
  className,
  onClick,
}: PropsType): React.ReactElement => (
  <div
    className={`${styles.root} ${className || ''}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${image?.scaledSrc?.w60 || placeholderThumbnail})`,
    }}
    onClick={onClick}
  />
);
