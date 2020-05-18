require('dotenv').config();

const includes = [];

switch (process.env.APOLLO_TYPE) {
  case 'meepshop':
    includes.push(
      './meepshop/**/src/**/*.{ts,tsx}',
      './meepshop/**/mock.{ts,tsx}',
    );
    break;

  case 'store':
    includes.push(
      './store/apollo-client-resolvers/schemas/*.graphql',
      './store/**/src/**/*.{ts,tsx}',
      './store/**/mock.{ts,tsx}',
    );
    break;

  case 'admin':
    includes.push(
      './admin/apollo-client-resolvers/schemas/*.graphql',
      './admin/**/src/**/*.{ts,tsx}',
      './admin/**/mock.{ts,tsx}',
    );
    break;

  default:
    includes.push('./packages/mock-types/src/**/*.{ts,tsx}');
    break;
}

module.exports = {
  client: {
    service: process.env.APOLLO_TAG
      ? `meepshop-api-stage@${process.env.APOLLO_TAG}`
      : 'meepshop-api-stage',
    includes,
    excludes: ['**/node_modules/**'],
  },
};
