const basicConfig = require('../../next.config');

module.exports = basicConfig({
  publicRuntimeConfig: {
    API_HOST: process.env.API_HOST || 'https://api.stage.meepcloud.com',
    VERSION: process.env.REPO_VERSION || +new Date(),
  },
});
