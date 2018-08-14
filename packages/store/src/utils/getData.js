import fetch from 'isomorphic-unfetch';
import { notification } from 'antd';

/**
 * @name getData
 * @description post qraphql query to get data for customized modules
 * @param query
 * @param variables
 */
export default async (query, variables) => {
  try {
    const res = await fetch('/api', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-meepshop-domain': window.meepShopStore.XMeepshopDomain,
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables }),
    });

    if (res.status !== 200) throw new Error(`${res.status}: ${res.statusText}`);

    const { error, ...data } = await res.json();

    if (error) return null;

    return data;
  } catch (error) {
    notification.error({ message: '發生錯誤', description: error.message });

    return null;
  }
};
