const basicConfig = require('../../next.config');

const FONT_FAMILY =
  '"PingFang TC", "Microsoft JhengHei", "Helvetica Neue", "Helvetica", "source-han-sans-traditional", "Arial", "sans-serif"';

// set default env in dev mode
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.STORE_DOMAIN)
    process.env.STORE_DOMAIN = 'bellatest.stage.meepcloud.com';
}

module.exports = basicConfig({
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    STORE_DOMAIN: process.env.STORE_DOMAIN,
  },
  lessLoaderOptions: {
    modifyVars: {
      'font-family': FONT_FAMILY,
      'font-family-no-number': FONT_FAMILY,
    },
  },
});
