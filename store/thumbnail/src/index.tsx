// import
import React from 'react';
import gql from 'graphql-tag';

import Placeholder from '@store/placeholder';

import styles from './styles/index.less';

// graphql typescript
import { thumbnailFragment as thumbnailFragmentType } from './__generated__/thumbnailFragment';

// typescript definition
interface PropsType {
  image: thumbnailFragmentType | null;
}

// definition
export const thumbnailFragment = gql`
  fragment thumbnailFragment on Image {
    scaledSrc {
      w120
    }
  }
`;

export default ({ image }: PropsType): React.ReactElement => (
  <div className={styles.wrapper}>
    {!image ? (
      <Placeholder />
    ) : (
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image.scaledSrc?.w120})` }}
      />
    )}
  </div>
);
