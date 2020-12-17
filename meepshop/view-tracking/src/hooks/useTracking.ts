// import
import { useContext, useState, useCallback } from 'react';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import { viewTrackingFragment } from '../gqls/__generated__/viewTrackingFragment';

// definition
export default (
  { name, category }: viewTrackingFragment['tracking'],
  custom?: string,
): {
  isTriggered: boolean;
  visibleChange: (visible: boolean) => void;
} => {
  const adTrack = useContext(AdTrackContext);
  const [isTriggered, setIsTriggered] = useState(false);
  const visibleChange = useCallback(
    visible => {
      if (isTriggered || !visible) return;

      adTrack.custom(custom || 'meepShop_view', name, category);
      setIsTriggered(true);
    },
    [name, category, adTrack, isTriggered, custom],
  );

  return {
    isTriggered,
    visibleChange,
  };
};
