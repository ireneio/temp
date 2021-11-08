// import
import React from 'react';

import '@meepshop/utils/lib/styles';
import { appWithTranslation } from '@meepshop/locales';
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
