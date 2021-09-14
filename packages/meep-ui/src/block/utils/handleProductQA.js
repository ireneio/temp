import React from 'react';

import { enhancer } from 'layout/DecoratorsRoot';

export default Component =>
  enhancer(
    React.memo(({ user, productInContext, ...props }) => (
      <Component {...props} product={productInContext} viewer={user} />
    )),
  );
