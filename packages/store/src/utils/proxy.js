// definition
export default (url, callback) => async (req, res) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-meepshop-domain': req.headers.host,
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
