// import
import logger from '@meepshop/utils/lib/logger';

// definition
export default ({ XMeepshopDomain, url, userAgent }) => {
  try {
    const regex = /^(([^\/?:]+)(:(\d+))?)?(\/?([^\/?#][^?#]*)?)?(\?([^#]+))?(#(.*))?/; // eslint-disable-line
    const matches = regex.exec(url.asPath);

    if (matches == null) throw new Error('No valid path');

    const search = matches[7] || '';
    const hash = matches[9] || '';
    return {
      host: XMeepshopDomain,
      href: `${XMeepshopDomain}${url.asPath}`,
      userAgent,
      path: url.asPath,
      pathname: matches[5],
      // Avoid no dispaly selected color for menu
      // when coming back from choosing store at landing page.
      search: search.includes('tradeNo') ? '' : search,
      hash,
      query: url.query,
    };
  } catch ({ message, stack }) {
    logger.error(JSON.stringify({ message, stack }));
    return {};
  }
};
