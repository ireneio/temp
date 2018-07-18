import fetch from 'isomorphic-unfetch';
import { notification } from 'antd';

/**
 * @name getData
 * @description post qraphql query to get data for customized modules
 * @param query
 * @param variables
 */
export default async function(query, variables) {
  try {
    const response = await fetch('/api', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-meepshop-domain': window.meepShopStore.XMeepshopDomain,
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables }),
    });
    let data;
    if (response.status === 200) {
      data = await response.json();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error(error);
    notification.error({ message: '發生錯誤', description: error.message });
    return { errors: error.message };
  }
}
