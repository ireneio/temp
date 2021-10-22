// FIXME: should use nginx
module.exports = (req, res, next) => {
  req.headers['x-meepshop-domain'] = req.headers.host;
  req.headers['x-meepshop-authorization-token'] =
    req.url === '/api/landing-page/graphql'
      ? req.cookies['x-meepshop-authorization-landing-page-token'] || null
      : req.cookies['x-meepshop-authorization-token'] || null;
  req.headers['accept-language'] =
    (req.cookies['next-i18next'] || '').replace('_', '-') || null;
  delete req.cookies;
  next();
};
