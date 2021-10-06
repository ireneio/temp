import { notification } from 'antd';
import { fetchWithRetries } from 'fbjs';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { API },
} = getConfig();

export default async ({ res, req, query, variables }) => {
  try {
    const graphql = {
      query: `${variables.type}${variables.keys ? `(${variables.keys})` : ''} {
        ${query}
      } ${variables.fragments !== undefined ? variables.fragments : ''}`,
      variables: variables.values,
    };

    const response = await fetchWithRetries(
      typeof window === 'undefined' ? `${API}/graphql` : '/api/graphql',
      {
        method: 'post',
        headers:
          typeof window === 'undefined'
            ? {
                'content-type': 'application/json',
                'x-meepshop-domain': req.headers.host,
                'x-meepshop-authorization-token':
                  req.cookies['x-meepshop-authorization-token'],
              }
            : { 'content-type': 'application/json' },
        credentials: typeof window === 'undefined' ? 'include' : 'same-origin',
        body: JSON.stringify(graphql),
      },
    );

    if (response.status < 400) {
      const data = await response.json();

      /** graphql Errors: userId not exist
       * Api throw this error when the user have been deleted.
       * Only happened in computeProductList, computeOrderList query
       */
      if (data?.errors?.[0]?.message === 'userId not exist') {
        if (typeof window === 'undefined') {
          res.cookie('x-meepshop-authorization-token', '', {
            maxAge: 0,
            httpOnly: true,
          });
          res.redirect(302, '/');
          return null;
        }
        notification.error({ message: 'Error: unknown user' });
        await fetchWithRetries('/api/auth/logout', {
          method: 'post',
          credentials: 'same-origin',
        });
        window.location.reload();
        return null;
      }

      return data;
    }

    /* Handle token is expired */
    if (response.status === 401) {
      if (typeof window === 'undefined') {
        res.cookie('x-meepshop-authorization-token', '', {
          maxAge: 0,
          httpOnly: true,
        });
        res.redirect(302, '/');
        return null;
      }
      notification.error({ message: 'Error: response 401' });
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

    if (typeof window === 'undefined') {
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
