/* eslint-disable no-var, object-shorthand */
var gql = require('graphql-tag');
var reactHooks = require('@apollo/react-hooks');
var apolloLink = require('apollo-link');
var apolloLinkHttp = require('apollo-link-http');
var apolloCacheInmemory = require('apollo-cache-inmemory');
var apolloClient = require('apollo-client');

module.exports = {
  gql: gql,
  useQuery: reactHooks.useQuery,
  useMutation: reactHooks.useMutation,
  useLazyQuery: reactHooks.useLazyQuery,
  useApolloClient: reactHooks.useApolloClient,
  ApolloProvider: reactHooks.ApolloProvider,
  split: apolloLink.split,
  from: apolloLink.from,
  HttpLink: apolloLinkHttp.HttpLink,
  InMemoryCache: apolloCacheInmemory.InMemoryCache,
  IntrospectionFragmentMatcher:
    apolloCacheInmemory.IntrospectionFragmentMatcher,
  ApolloClient: apolloClient.ApolloClient,
};
