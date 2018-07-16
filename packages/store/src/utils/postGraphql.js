import getConfig from 'next/config';

import getCookie from './getCookie';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

const fetchApi = async ({ graphql, isServer, XMeepshopDomain, cookie }) => {
  let response;
  let data;
  if (isServer) {
    const XMeepshopDomainToken = getCookie(
      'x-meepshop-authorization-token',
      cookie,
    );
    response = await fetch(`${API_HOST}/graphql`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-meepshop-domain': XMeepshopDomain,
        'x-meepshop-authorization-token': XMeepshopDomainToken,
      },
      credentials: 'include',
      body: JSON.stringify(graphql),
    });
  } else {
    response = await fetch('/api', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        cookie,
      },
      credentials: 'include',
      body: JSON.stringify(graphql),
    });
  }
  if (response.status === 200) {
    data = await response.json();
  } else {
    data = await response.json();
    throw new Error(
      `${response.status}: ${response.statusText} - ${data.errors[0].msg ||
        data.errors[0].message ||
        ''}`,
    );
  }
  if (data.errors) {
    // FIXME: fix getWebTrackList unsense error from not installing app store
    if (data.errors[0].message === 'App Store: webTrack is not install.') {
      return { ...data, errors: null };
    }
    throw new Error(data.errors[0].message);
  }
  if (data.error) throw new Error(data.error);
  return data;
};

export default async ({
  query,
  variables,
  isServer,
  XMeepshopDomain,
  cookie,
}) => {
  const graphql = {
    query: `${variables.type}(${variables.keys}) {
      ${query}
    } ${variables.fragments !== undefined ? variables.fragments : ''}`,
    variables: variables.values,
  };
  const data = await fetchApi({
    graphql,
    isServer,
    XMeepshopDomain,
    cookie,
  });
  return data;
};
