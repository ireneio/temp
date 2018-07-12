const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');

const protocal = process.env.API_PROTOCAL || 'https';
const production = process.env.NODE_ENV === 'production';

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = () => {};
}

module.exports = withSourceMaps(
  withImages(
    withLess(
      withCSS(
        withBundleAnalyzer({
          publicRuntimeConfig: {
            PRODUCTION: production,
            VERSION: process.env.REPO_VERSION || +new Date(),
            API_HOST: production
              ? 'http://meepshop-api:15265'
              : `${protocal}://api.stage.meepcloud.com`,
            EXTERNAL_API_HOST: production
              ? `${protocal}://${process.env.API_HOST}`
              : `${protocal}://api.stage.meepcloud.com`,
            DOMAIN: 'bellatest.stage.meepcloud.com',
          },
          analyzeServer: ['server', 'both'].includes(
            process.env.BUNDLE_ANALYZE,
          ),
          analyzeBrowser: ['browser', 'both'].includes(
            process.env.BUNDLE_ANALYZE,
          ),
          bundleAnalyzerConfig: {
            server: {
              analyzerMode: 'static',
              reportFilename: '../../../analyzer/server.html',
            },
            browser: {
              analyzerMode: 'static',
              reportFilename: '../../analyzer/client.html',
            },
          },
          lessLoaderOptions: {
            javascriptEnabled: true,
          },
          /* eslint-disable no-param-reassign */
          webpack: (config, { dev }) => {
            if (!dev) {
              config.devtool = 'source-map';
            }

            config.module.rules.find(
              ({ use: { loader } }) => loader === 'next-babel-loader',
            ).use.options.configFile =
              '../../babel.config.js';

            config.plugins.push(new MomentLocalesPlugin());
            return config;
          },
          /* eslint-enable no-param-reassign */
        }),
      ),
    ),
  ),
);
