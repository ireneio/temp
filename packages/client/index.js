const gql = require('graphql-tag');
const {
  useQuery,
  useMutation,
  useLazyQuery,
  useApolloClient,
  ApolloProvider,
} = require('@apollo/react-hooks');
const { split, from } = require('apollo-link');
const { HttpLink } = require('apollo-link-http');
const {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} = require('apollo-cache-inmemory');
const { ApolloClient } = require('apollo-client');

module.exports = {
  gql,
  useQuery,
  useMutation,
  useLazyQuery,
  useApolloClient,
  ApolloProvider,
  split,
  from,
  HttpLink,
  InMemoryCache,
  IntrospectionFragmentMatcher,
  ApolloClient,
};
