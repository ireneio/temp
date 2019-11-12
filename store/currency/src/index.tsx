// typescript import
import { Subtract } from '@store/utils/lib/types';

// import
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Spin, Icon } from 'antd';
import idx from 'idx';

import CurrencyContext from './context';
import generateConverter from './utils/generateConverter';
import initFx from './utils/initFx';

// graphql typescript
import { getStoreCurrency } from './__generated__/getStoreCurrency';

// typescript definition
interface PropsType {
  currency: string;
  children: React.ReactNode;
}

export interface CurrencyType {
  c: (price: number) => string;
  setCurrency: (currency: string) => void;
  currency: string;
}

// definition
export const Context = CurrencyContext;

export const CurrencyProvider = React.memo(
  ({ currency: propsCurrency, children }: PropsType) => {
    const [currency, setCurrency] = useState<string>(propsCurrency);

    return (
      <Query<getStoreCurrency>
        query={gql`
          query getStoreCurrency {
            viewer {
              id
              store {
                id
                currency
              }
            }

            exchangeRateService {
              base
              rates
              timestamp
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading || error)
            return <Spin indicator={<Icon type="loading" spin />} />;

          const storeCurrency =
            idx(data, _ => _.viewer.store.currency) || 'TWD';

          initFx(idx(data, _ => _.exchangeRateService));

          return (
            <CurrencyContext.Provider
              value={{
                convertCurrency: generateConverter(storeCurrency, currency),
                setCurrency,
                currency,
              }}
            >
              {children}
            </CurrencyContext.Provider>
          );
        }}
      </Query>
    );
  },
);

export default <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<Subtract<P, CurrencyType>> => (props: P) => (
  <CurrencyContext.Consumer>
    {({ convertCurrency, setCurrency, currency }) => (
      <Component
        {...props}
        c={convertCurrency}
        setCurrency={setCurrency}
        currency={currency}
      />
    )}
  </CurrencyContext.Consumer>
);
