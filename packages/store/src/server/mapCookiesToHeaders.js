// FIXME: should use nginx
module.exports = (req, res, next) => {
  req.headers['x-meepshop-domain'] = req.get('host');
  req.headers['x-meepshop-authorization-token'] =
    req.cookies['x-meepshop-authorization-token'] || null;
  req.headers['accept-language'] =
    (req.cookies['next-i18next'] || '').replace('_', '-') || null;
  delete req.cookies;

  next();
};
