// import
import { useContext, useCallback } from 'react';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import { goToButtonFragment_goToButton as goToButtonFragmentGoToButton } from '@meepshop/types/gqls/meepshop';

// definition
export default (
  goToButton: goToButtonFragmentGoToButton | null,
): (() => void) => {
  const adTrack = useContext(AdTrackContext);

  return useCallback(() => {
    const dom = document.getElementById(`block-${goToButton?.link?.group?.id}`);

    if (dom) dom.scrollIntoView({ behavior: 'smooth' });

    if (goToButton?.link?.tracking)
      adTrack.custom(
        'meepShop_click',
        goToButton?.link?.tracking?.name || '',
        goToButton?.link?.tracking?.category || null,
      );
  }, [goToButton, adTrack]);
};
