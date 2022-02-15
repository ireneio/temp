// import
import React from 'react';
import { SchemaLink } from '@apollo/client/link/schema';

import '@meepshop/utils/lib/styles';
import { appWithTranslation } from '@meepshop/locales';
import { buildWithApollo } from '@meepshop/apollo';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';

import MockTypes from './index';
import schema from './schema';

// definition
export default buildWithApollo({
  name: 'meepshop',
  terminatingLink: new SchemaLink({ schema }),
})(
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
