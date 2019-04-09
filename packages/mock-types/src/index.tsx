import React from 'react';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { SchemaLink } from 'apollo-link-schema';
import { Drawer, Button, notification } from 'antd';

import MockData from './MockData';
import schema from './schema';
import mock from './mock';
import styles from './styles/index.less';

mock.init();

interface StateType {
  mockTypes: string[];
  visibleDrawer: boolean;
}

export default class MockTypes extends React.PureComponent<{}, StateType> {
  public state: StateType = {
    mockTypes: [],
    visibleDrawer: false,
  };

  private client = new ApolloClient({
    cache: new InMemoryCache({
      dataIdFromObject: ({ id }) => id,
    }),
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
        (operation, forward) =>
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
