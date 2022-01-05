const basicConfig = require('../../next.config');

const FONT_FAMILY =
  '"PingFang TC", "Microsoft JhengHei", "Helvetica Neue", "Helvetica", "source-han-sans-traditional", "Arial", "sans-serif"';

module.exports = basicConfig({
  lessLoaderOptions: {
    modifyVars: {
      'font-family': FONT_FAMILY,
      'font-family-no-number': FONT_FAMILY,
    },
  },
});
