import getConfig from 'next/config';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

export default async ({ res, req, query, variables, isServer }) => {
  try {
    const graphql = {
      query: `${variables.type}${variables.keys ? `(${variables.keys})` : ''} {
        ${query}
      } ${variables.fragments !== undefined ? variables.fragments : ''}`,
      variables: variables.values,
    };

    const response = isServer
      ? await fetch(`${API_HOST}/graphql`, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            'x-meepshop-domain': req.headers['x-meepshop-domain'],
            'x-meepshop-authorization-token':
              req.headers['x-meepshop-authorization-token'],
          },
          credentials: 'include',
          body: JSON.stringify(graphql),
        })
      : await fetch('/api', {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(graphql),
        });

    /* set-cookie in server-side */
    if (isServer && !req.headers['x-meepshop-authorization-token']) {
      const newToken = response.headers.get('x-meepshop-authorization-token');
      if (newToken) {
        res.setHeader(
          'Set-Cookie',
          `x-meepshop-authorization-token=${newToken}; path=/; Max-Age=${86400 *
            7}; HttpOnly`,
        );
      }
    }

    if (response.status < 400) {
      const data = await response.json();

      /** graphql Errors: userId not exist
       * Api throw this error when the user have been deleted.
       * Only happened in computeProductList, computeOrderList query
       */
      if (data?.errors?.[0]?.message === 'userId not exist') {
        if (isServer) {
          res.setHeader(
            'Set-Cookie',
            `x-meepshop-authorization-token=; path=/; Max-Age=0; HttpOnly`,
          );
          res.writeHead(302, {
            Location: '/',
          });
          res.end();
          return null;
        }
        alert('此會員不存在');
        await fetch('/signout', { method: 'get', credentials: 'same-origin' });
        window.location.reload();
        return null;
      }

      return data;
    }

    /* Handle token is expired */
    if (response.status === 401) {
      if (isServer) {
        res.setHeader(
          'Set-Cookie',
          `x-meepshop-authorization-token=; path=/; Max-Age=0; HttpOnly`,
        );
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
        return null;
      }
      alert('讀取資料錯誤：401'); // eslint-disable-line
      window.location.reload();
      return null;
    }

    if (response.status === 400) {
      const data = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} ${data?.errors?.[0]
          ?.message || ''}`,
      );
    }

    if (isServer) {
      const os = require('os'); // eslint-disable-line
      throw new Error(
        `${response.status} ${response.statusText} - ${os.hostname()}`,
      );
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch ({ message }) {
    return { apiErr: { status: 'API_ERROR', message } };
  }
};
