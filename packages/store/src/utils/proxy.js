// definition
export default (url, callback) => async (req, res) => {
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
      'x-meepshop-domain': req.headers.host,
      'x-meepshop-authorization-token':
        req.cookies['x-meepshop-authorization-token'] || null,
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

  const html = (await callback(req, res, response)) || (await response.text());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(html);
};
