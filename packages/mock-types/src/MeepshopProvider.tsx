// import
import React from 'react';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import withApollo from '@meepshop/apollo';

import MockTypes from './index';

// definition
export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => <MockTypes>{children}</MockTypes>),
  ),
);
