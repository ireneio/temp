// import typescript
import { NextLink } from 'apollo-link';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { PropsType } from '../index';

// import
import { useMemo, useState } from 'react';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { SchemaLink } from 'apollo-link-schema';
import { notification } from 'antd';

import schema from '../schema';
import mock from '../mock';

// definition
mock.init();

export default ({
  initializeCache,
  introspectionQueryResultDataType,
  default: resolvers,
}: PropsType): {
  mockTypes: string[];
  client: ApolloClient<NormalizedCacheObject>;
} => {
  const [mockTypes, setMockTypes] = useState<string[]>([]);
  const client = useMemo(() => {
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
                  setMockTypes([...mock.tracking]);
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
  }, [initializeCache, introspectionQueryResultDataType, resolvers]);

  return {
    mockTypes,
    client,
  };
};
