// import
import React from 'react';

import '@meepshop/utils/styles/base.less';
import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import withApollo from '@meepshop/apollo';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';

import MockTypes from './index';

// definition
export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => (
      <MockTypes>
        <ColorsProvider>
          <AppsProvider>{children}</AppsProvider>
        </ColorsProvider>
      </MockTypes>
    )),
  ),
);
