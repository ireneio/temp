// import
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import useTracking from './hooks/useTracking';
import styles from './styles/index.less';

// graphql typescript
import { viewTrackingFragment } from './gqls/__generated__/viewTrackingFragment';

// typescript definition
interface PropsType extends viewTrackingFragment {
  custom?: string;
}

// definition
export default React.memo(({ tracking, custom }: PropsType) => {
  const { isTriggered, visibleChange } = useTracking(tracking, custom);

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
