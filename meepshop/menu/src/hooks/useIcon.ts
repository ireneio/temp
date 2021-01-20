// typescript import
import { mockComponent } from '@meepshop/images';

// import
import { useMemo } from 'react';

import * as icons from '../icons';

// graphql typescript
import { DefaultIconEnum } from '@meepshop/types/gqls/meepshop';

// definition
export default (icon: DefaultIconEnum): typeof mockComponent | (() => null) =>
  useMemo(() => {
    if (!icon) return () => null;

    const iconName = `MENU_ICONS_${icon}`
      .toLowerCase()
      .replace(/_[\w]/g, str =>
        str.replace(/_/, '').toUpperCase(),
      ) as keyof typeof icons;

    return icons[iconName];
  }, [icon]);
