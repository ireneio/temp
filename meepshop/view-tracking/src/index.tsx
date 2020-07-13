// import
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import useTracking from './hooks/useTracking';
import styles from './styles/index.less';

// graphql typescript
import { viewTrackingFragment } from './__generated__/viewTrackingFragment';

// definition
export default React.memo(({ tracking }: viewTrackingFragment) => {
  const { isTriggered, visibleChange } = useTracking(tracking);

  return (
    <VisibilitySensor
      active={!isTriggered}
      onChange={visibleChange}
      partialVisibility
    >
      <div
        className={`${styles.root} ${!isTriggered ? '' : styles.isTriggered}`}
      />
    </VisibilitySensor>
  );
});
