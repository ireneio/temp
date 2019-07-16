// typescript import
import { Subtract } from '@store/utils/lib/types';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Spin, Icon } from 'antd';
import idx from 'idx';

import CurrencyContext from './context';
import generateConverter from './utils/generateConverter';

// graphql typescript
import { getStoreCurrency } from './__generated__/getStoreCurrency';

// typescript definition
interface PropsType {
  currency: string;
}

interface StateType {
  currency: string;
}

export interface CurrencyType {
  c: (price: string) => string;
  setCurrency: (currency: string) => void;
  currency: string;
}

// definition
export class CurrencyProvider extends React.Component<PropsType, StateType> {
  public constructor(props: PropsType) {
    super(props);
    this.state = {
      currency: props.currency,
    };
  }

  private getContextValue = (storeCurrency: string) => {
    const { currency } = this.state;

    return {
      convertCurrency: generateConverter(storeCurrency, currency),
      setCurrency: this.setCurrency,
      currency,
    };
  };

  private setCurrency = (currency: string) => {
    this.setState({ currency });
  };

  public render(): React.ReactElement {
    const { children } = this.props;

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
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading || error)
            return <Spin indicator={<Icon type="loading" spin />} />;

          const storeCurrency =
            idx(data, _ => _.viewer.store.currency) || 'TWD';

          return (
            <CurrencyContext.Provider
              value={this.getContextValue(storeCurrency)}
            >
              {children}
            </CurrencyContext.Provider>
          );
        }}
      </Query>
    );
  }
}

export default <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<Subtract<P, CurrencyType>> => props => (
  <CurrencyContext.Consumer>
    {({ convertCurrency, setCurrency, currency }) => (
      <Component
        {...(props as P)}
        c={convertCurrency}
        setCurrency={setCurrency}
        currency={currency}
      />
    )}
  </CurrencyContext.Consumer>
);
