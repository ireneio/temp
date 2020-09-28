require('dotenv').config();

const includes = [
  './preReleaseSchemas/*.graphql',
  './meepshop/apollo/schemas/*.graphql',
  './meepshop/**/src/**/*.{ts,tsx}',
  './meepshop/**/mock.{ts,tsx}',
];

switch (process.env.APOLLO_TYPE) {
  case 'store':
    includes.push(
      './store/apollo/schemas/*.graphql',
      './store/**/src/**/*.{ts,tsx}',
      './store/**/mock.{ts,tsx}',
    );
    break;

  case 'admin':
    includes.push(
      './admin/apollo/schemas/*.graphql',
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
    service: 'meepshop-api-stage',
    includes,
    excludes: ['**/node_modules/**'],
  },
};
