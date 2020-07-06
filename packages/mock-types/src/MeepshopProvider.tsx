// import
import React from 'react';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import * as resolvers from '@meepshop/apollo';

import MockTypes from './index';

// definition
export default appWithTranslation(
  React.memo(({ children }) => (
    <MockTypes {...resolvers}>{children}</MockTypes>
  )),
);
