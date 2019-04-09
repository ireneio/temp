module.exports = {
  client: {
    includes: [
      './packages/**/src/**/*.{ts,tsx}',
      './store/**/src/**/*.{ts,tsx}',
      './admin/**/src/**/*.{ts,tsx}',
    ],
    service: {
      name: 'meepshop',
      url: 'https://api.stage.meepcloud.com/graphql',
      headers: {
        'x-meepshop-domain': 'bellatest.stage.meepcloud.com',
      },
    },
  },
};
