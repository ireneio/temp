export { default as gql } from 'graphql-tag';
export { DataProxy } from 'apollo-cache';
export {
  MutationFunction,
  MutationFunctionOptions,
  QueryResult,
} from '@apollo/react-common';
export {
  useQuery,
  useMutation,
  useLazyQuery,
  useApolloClient,
  ApolloProvider,
  MutationTuple,
} from '@apollo/react-hooks';
export { ApolloLink, split, from } from 'apollo-link';
export { HttpLink } from 'apollo-link-http';
export {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
export { ApolloClient, ApolloError } from 'apollo-client';
export { Resolvers } from 'apollo-client/core/types';
