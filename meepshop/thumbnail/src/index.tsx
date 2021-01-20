// import
import React from 'react';

import { placeholderThumbnail_w120 as placeholderThumbnail } from '@meepshop/images';

import styles from './styles/index.less';

// graphql typescript
import { thumbnailFragment as thumbnailFragmentType } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  image: thumbnailFragmentType | null;
}

// definition
export default ({ image }: PropsType): React.ReactElement => (
  <div className={styles.wrapper}>
    <div
      className={styles.image}
      style={{
        backgroundImage: `url(${image?.scaledSrc?.w120 ||
          placeholderThumbnail})`,
      }}
    />
  </div>
);
