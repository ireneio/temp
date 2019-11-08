// import typescript
import { NextLink } from 'apollo-link';
import { Resolvers } from 'apollo-client/core/types';
import { IntrospectionResultData } from 'apollo-cache-inmemory';

// import
import React from 'react';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { Drawer, Button, notification } from 'antd';

import MockData from './MockData';
import schema from './schema';
import mock from './mock';
import styles from './styles/index.less';

// typescript definition
export interface PropsType {
  initializeCache: (cache: InMemoryCache) => void;
  introspectionQueryResultDataType: IntrospectionResultData['__schema']['types'];
  default: Resolvers;
}

interface StateType {
  mockTypes: string[];
  visibleDrawer: boolean;
}

// definition
mock.init();

export default class MockTypes extends React.PureComponent<
  PropsType,
  StateType
> {
  public state: StateType = {
    mockTypes: [],
    visibleDrawer: false,
  };

  private client = (() => {
    const {
      initializeCache,
      introspectionQueryResultDataType,
      default: resolvers,
    } = this.props;
    const cache = new InMemoryCache({
      dataIdFromObject: ({ id }) => id,
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: {
          __schema: {
            types: introspectionQueryResultDataType,
          },
        },
      }),
    });

    initializeCache(cache);

    return new ApolloClient({
      cache,
      resolvers,
      link: ApolloLink.from([
        onError(({ graphQLErrors }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
              const description = `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                locations,
                null,
                2,
              )}, Path: ${JSON.stringify(path, null, 2)}`;

              notification.error({
                message: '發生錯誤',
                description,
              });
            });
        }),
        new ApolloLink(
          (operation, forward: NextLink) =>
            new Observable(observer => {
              const sub = forward(operation).subscribe({
                next: result => {
                  this.setState({ mockTypes: mock.tracking });
                  observer.next(result);
                },
              });

              return () => {
                if (sub) sub.unsubscribe();
              };
            }),
        ),
        new SchemaLink({ schema }),
      ]),
    });
  })();

  public render(): React.ReactNode {
    const { children } = this.props;
    const { mockTypes, visibleDrawer } = this.state;

    return (
      <ApolloProvider client={this.client}>
        {children}

        <Button
          className={styles.button}
          onClick={() => this.setState({ visibleDrawer: !visibleDrawer })}
          type="primary"
          ghost
        >
          Mock datas
        </Button>

        <Drawer
          onClose={() => this.setState({ visibleDrawer: false })}
          visible={visibleDrawer}
          width="30%"
          title="Mock datas"
          placement="right"
        >
          {mockTypes.map((type, typeIndex) => (
            <div key={type} className={styles.buttons}>
              {type}:{' '}
              <MockData
                client={this.client}
                type={type}
                typeIndex={typeIndex}
              />
            </div>
          ))}
        </Drawer>
      </ApolloProvider>
    );
  }
}
