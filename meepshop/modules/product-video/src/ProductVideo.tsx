// import
import React from 'react';

import Video from '@meepshop/video';

// graphql typescript
import { productVideoFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default React.memo(
  ({ id, width, ratio, product }: productVideoFragment) =>
    !product?.videoLink?.value ? null : (
      <Video
        id={id}
        width={width}
        ratio={ratio}
        href={product.videoLink.value}
        __typename="VideoModule"
      />
    ),
);