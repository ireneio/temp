const path = require('path');

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');

const protocal = process.env.API_PROTOCAL || 'https';
const production = process.env.NODE_ENV === 'production';
const domain = process.env.TEST_DOMAIN || 'bellatest.stage.meepcloud.com';
const api = process.env.TEST_API || 'api.stage.meepcloud.com';

const FONT_FAMILY =
  '"PingFang TC", "Microsoft JhengHei", "Helvetica Neue", "Helvetica", "source-han-sans-traditional", "Arial", "sans-serif"';

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
          useFileSystemPublicRoutes: false,
          publicRuntimeConfig: {
            PRODUCTION: production,
            VERSION: process.env.REPO_VERSION || +new Date(),
            API_HOST: production
              ? 'http://meepshop-api:15265'
              : `${protocal}://${api}`,
            EXTERNAL_API_HOST: production
              ? `${protocal}://${process.env.API_HOST}`
              : `${protocal}://${api}`,
            DOMAIN: domain,
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
            modifyVars: {
              'font-family': FONT_FAMILY,
              'font-family-no-number': FONT_FAMILY,
            },
          },
          /* eslint-disable no-param-reassign */
          webpack: (config, { dev }) => {
            if (!dev) config.devtool = 'source-map';

            config.module.rules.find(
              ({ use: { loader } }) => loader === 'next-babel-loader',
            ).use.options.configFile = '../../babel.config.js';

            config.plugins.push(new MomentLocalesPlugin());

            const originalEntry = config.entry;

            config.entry = async () => {
              const entries = await originalEntry();
              const polyfillsPath = path.resolve(
                __dirname,
                './src/static/polyfills.js',
              );

              if (
                entries['main.js'] &&
                !entries['main.js'].includes(polyfillsPath)
              )
                entries['main.js'].unshift(polyfillsPath);

              return entries;
            };

            return config;
          },
          /* eslint-enable no-param-reassign */
        }),
      ),
    ),
  ),
);
