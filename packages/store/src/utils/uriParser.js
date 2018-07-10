import * as R from 'ramda';

export default ({ XMeepshopDomain, url, userAgent }) => {
  const pathname = url.asPath.split('?')[0];
  const rest = R.split('?')(url.asPath)[1] || '';
  const search = `${R.isEmpty(rest) ? '' : '?'}${R.split('#')(rest)[0]}`;
  const hash = R.split('#')(rest)[1] || '';
  return {
    host: XMeepshopDomain,
    href: `${XMeepshopDomain}${url.asPath}`,
    userAgent,
    path: url.asPath,
    pathname,
    // Avoid no dispaly selected color for menu
    // when coming back from choosing store at landing page.
    search: search.includes('tradeNo') ? '' : search,
    hash,
    query: url.query,
  };
};
