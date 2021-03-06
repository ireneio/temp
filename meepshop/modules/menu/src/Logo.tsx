// import
import React, { useContext } from 'react';

import { Sensor as SensorContext } from '@meepshop/context';
import { logoDesktopDefault_scaledSrc as logoDesktopDefault } from '@meepshop/images';
import Link from '@meepshop/link';

// graphql typescript
import {
  logoUserFragment,
  logoMenuDesignObjectTypeFragment,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  viewer: logoUserFragment | null;
  design: logoMenuDesignObjectTypeFragment | null;
}

// definition
export default React.memo(({ viewer, design }: PropsType) => {
  const { isMobile } = useContext(SensorContext);
  const logo = !isMobile
    ? viewer?.store?.logoImage || { scaledSrc: logoDesktopDefault }
    : viewer?.store?.mobileLogoImage;

  return !design?.showLogo ? null : (
    <Link href="/" target="_self">
      <a href="/">
        <img
          src={logo?.scaledSrc?.w60 || ''}
          alt={logo?.scaledSrc?.w60 || ''}
        />
      </a>
    </Link>
  );
});
