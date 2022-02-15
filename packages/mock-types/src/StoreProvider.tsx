// import
import React from 'react';
import { SchemaLink } from '@apollo/client/link/schema';

import '@store/utils/lib/styles';
import { appWithTranslation } from '@meepshop/locales';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { RoleProvider } from '@meepshop/context/lib/Role';
import { buildWithApollo } from '@meepshop/apollo';
import { resolvers } from '@store/apollo';
import FbProvider from '@store/fb';
import CurrencyProvider from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import MockTypes from './index';
import schema from './schema';

// definition
export default buildWithApollo({
  name: 'store',
  resolvers,
  terminatingLink: new SchemaLink({ schema }),
})(
  appWithTranslation(
    React.memo(({ children }) => (
      <MockTypes>
        <FbProvider>
          <RoleProvider>
            <ColorsProvider>
              <AppsProvider>
                <CurrencyProvider>
                  <AdTrackProvider>{children}</AdTrackProvider>
                </CurrencyProvider>
              </AppsProvider>
            </ColorsProvider>
          </RoleProvider>
        </FbProvider>
      </MockTypes>
    )),
  ),
);
