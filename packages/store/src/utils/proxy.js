// definition
export default (url, callback) => async (req, res) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-meepshop-domain': req.headers.host,
      'x-meepshop-authorization-token':
        req.url === '/api/landing-page/graphql'
          ? req.cookies['x-meepshop-authorization-landing-page-token'] || null
          : req.cookies['x-meepshop-authorization-token'] || null,
      'accept-language':
        (req.cookies['next-i18next'] || '').replace('_', '-') || null,
    },
    credentials: 'include',
    body: JSON.stringify(req.body),
  });

  if (response.status >= 400)
    throw new Error(`${response.status}: ${response.statusText}(${response})`);

  const html = (await callback(req, res, response)) || (await response.text());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(html);
};
