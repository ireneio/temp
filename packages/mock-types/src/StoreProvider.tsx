// import
import React from 'react';
import { Provider } from 'react-redux';

import { appWithTranslation } from '@meepshop/locales';
import { EventsProvider } from '@meepshop/context/lib/Events';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import '@store/utils/styles/base.less';
import withApollo from '@store/apollo';
import FbProvider from '@store/fb';
import CurrencyProvider from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import MockTypes from './index';
import mockStore from './mockStore';

// definition
export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => (
      <MockTypes>
        <EventsProvider>
          <FbProvider>
            <ColorsProvider>
              <AppsProvider>
                <CurrencyProvider>
                  <AdTrackProvider>
                    <Provider store={mockStore()}>{children}</Provider>
                  </AdTrackProvider>
                </CurrencyProvider>
              </AppsProvider>
            </ColorsProvider>
          </FbProvider>
        </EventsProvider>
      </MockTypes>
    )),
  ),
);
