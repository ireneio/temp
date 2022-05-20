// definition
export default (url, callback) => async (req, res) => {
  // FIXME: T10566, remove after next >= 12
  if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_STORE_DOMAIN)
    req.headers.host = process.env.NEXT_PUBLIC_STORE_DOMAIN;

  const response = await fetch(url, {
    method: 'post',
    headers: {
      ...Object.keys(req.headers)
        .filter(key => /apollographql/.test(key) || /x-meepshop/.test(key))
        .reduce(
          (result, key) => ({
            ...result,
            [key]: req.headers[key],
          }),
          {},
        ),
      'Content-Type': 'application/json',
      'User-Agent': req.headers['user-agent'],
      'x-meepshop-domain': req.headers.host,
      'x-meepshop-authorization-token':
        req.cookies['x-meepshop-authorization-token'] || null,
      'x-meepshop-promo-code': req.cookies.promoCode || null,
      'accept-language':
        (req.cookies['next-i18next'] || '').replace('_', '-') || null,
    },
    credentials: 'include',
    body: JSON.stringify(req.body),
  });

  if (response.status !== 200) {
    res.writeHead(response.status, response.headers);
    res.end(await response.text());
    return;
  }

  const html =
    (await callback?.(req, res, response)) || (await response.text());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(html);
};
