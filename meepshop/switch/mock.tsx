// import
import React from 'react';

import Wrapper from './src';

// definition
export default React.memo(() => (
  <Wrapper isTrue={false} render={children => <div>{children}</div>}>
    <div>content</div>
  </Wrapper>
));
