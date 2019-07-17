const includes = [];

switch (process.env.APOLLO_TYPE) {
  case 'store':
    includes.push(
      './store/apollo-client-resolvers/schemas/*.graphql',
      './store/**/src/**/*.{ts,tsx}',
    );
    break;

  case 'admin':
    includes.push(
      './admin/apollo-client-resolvers/schemas/*.graphql',
      './admin/**/src/**/*.{ts,tsx}',
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
  },
};
