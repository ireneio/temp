// import
import React from 'react';

import Image from '@meepshop/image';
import ViewTracking from '@meepshop/view-tracking';

import styles from './styles/index.less';

// graphql typescript
import { smartConversionFragment } from './gqls/__generated__/smartConversionFragment';

// definition
export default React.memo(
  ({ id, displaySample, width, align, imageAlt }: smartConversionFragment) => {
    if (!displaySample) return null;

    const { image, eventName } = displaySample;

    return (
      <div className={styles.root}>
        <Image
          __typename="ImageModule"
          id={id}
          image={image}
          link={null}
          width={width}
          justifyContent={align}
          alt={imageAlt}
        />
        <ViewTracking
          __typename="ViewTrackingModule"
          id={id}
          tracking={{
            __typename: 'Tracking',
            name: eventName,
            category: 'meepShop_test',
          }}
          custom="meepShop_test"
        />
      </div>
    );
  },
);
