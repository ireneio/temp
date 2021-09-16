// import
import { useMemo } from 'react';

// graphql typescript
import { SocialMediaModuleType } from '@meepshop/types/gqls/meepshop';

// definition
export default (
  color: string,
  socialMediaType: SocialMediaModuleType,
): {
  fill?: string;
  stroke?: string;
} =>
  useMemo(
    () =>
      ({
        NONE: { fill: color },
        CIRCLE: { stroke: color, fill: color },
        CIRCLE_FILLED: { fill: color },
        ORIGIN: {},
      }[socialMediaType]),
    [color, socialMediaType],
  );
