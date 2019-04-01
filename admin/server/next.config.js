/* eslint-disable */
const path = require('path');
const withLess = require('@zeit/next-less');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = () => {};
}

module.exports = withLess({
  publicRuntimeConfig: {
    PRODUCTION: process.env.NODE_ENV === 'production',
    VERSION: process.env.REPO_VERSION || +new Date(),
    API_DOMAIN: process.env.API_DOMAIN || 'admin.stage.meepcloud.com',
    API_HOST: process.env.API_HOST || 'https://api.stage.meepcloud.com',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: config => {
    config.module.rules.find(
      ({ use: { loader } }) => loader === 'next-babel-loader',
    ).use.options.configFile = path.resolve(__dirname, '../../babel.config.js');

    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes(
          require.resolve('core-js/modules/es6.string.starts-with'),
        )
      )
        entries['main.js'].unshift(
          require.resolve('core-js/modules/es6.string.starts-with'),
        );

      return entries;
    };

    config.plugins.push(new MomentLocalesPlugin());

    return config;
  },
});
