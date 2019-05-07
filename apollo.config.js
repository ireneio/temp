const includes = [];

if (!process.env.APOLLO_TYPE)
  includes.push('./packages/mock-types/src/**/*.{ts,tsx}');
else {
  if (process.env.APOLLO_TYPE === 'store')
    includes.push(
      './store/apollo-client-resolvers/schemas/*.graphql',
      './store/**/src/**/*.{ts,tsx}',
    );

  if (process.env.APOLLO_TYPE === 'admin')
    includes.push(
      './admin/apollo-client-resolvers/schemas/*.graphql',
      './admin/**/src/**/*.{ts,tsx}',
    );
}

module.exports = {
  client: {
    includes,
    service: {
      name: 'meepshop',
      url: 'https://api.stage.meepcloud.com/graphql',
      headers: {
        'x-meepshop-domain': 'bellatest.stage.meepcloud.com',
      },
    },
  },
};
