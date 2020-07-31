// import
import React from 'react';

import '@meepshop/utils/styles/base.less';
import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import withApollo from '@meepshop/apollo';
import { ColorsProvider } from '@meepshop/context/lib/colors';
import { AppsProvider } from '@meepshop/context/lib/apps';

import MockTypes from './index';

// definition
export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => (
      <ColorsProvider>
        <AppsProvider>
          <MockTypes>{children}</MockTypes>
        </AppsProvider>
      </ColorsProvider>
    )),
  ),
);
