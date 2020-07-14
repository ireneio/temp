// import
import React from 'react';

import Iframe from '@meepshop/iframe';

// graphql typescript
import { productIframeFragment } from './__generated__/productIframeFragment';

// definition
export default React.memo(({ id, product }: productIframeFragment) =>
  !product?.info?.zh_TW ? null : (
    <Iframe id={id} htmlCode={product.info.zh_TW} __typename="IframeModule" />
  ),
);
