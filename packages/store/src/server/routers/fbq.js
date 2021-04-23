const proxy = require('express-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { ENV } = publicRuntimeConfig;

module.exports = proxy(
  ENV === 'stage'
    ? 'https://fb-conversions-proxy.meepstage.com'
    : 'https://fb-conversions-proxy.meepshop.com',
  {
    proxyReqPathResolver: () => '/send-to-conversions-api',
  },
);
