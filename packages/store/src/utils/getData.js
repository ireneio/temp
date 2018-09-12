import fetch from 'isomorphic-unfetch';
import { notification } from 'antd';

/**
 * @name getData
 * @description post qraphql query to get data for customized modules
 * @param query
 * @param variables
 */
const getData = async (query, variables, retryTimes = 0) => {
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

    if (res.status < 400) {
      const data = await res.json();

      /** graphql Errors: userId not exist
       * Api throw this error when the user have been deleted.
       */
      if (data?.errors?.[0]?.message === 'userId not exist') {
        alert('此會員不存在');
        await fetch('/signout', { method: 'get', credentials: 'same-origin' });
        window.location.reload();
        return null;
      }

      return data;
    }

    if (res.status === 401) {
      alert('讀取資料錯誤：401'); // eslint-disable-line
      window.location.reload();
      return null;
    }
    throw new Error(`${res.status}: ${res.statusText}`);
  } catch (error) {
    if (navigator.onLine !== undefined && !navigator.onLine && retryTimes < 3) {
      const retryData = await new Promise(resolve => {
        setTimeout(() => {
          resolve(getData(query, variables, retryTimes + 1));
        }, 1000);
      });

      return retryData;
    }

    notification.error({ message: '發生錯誤', description: error.message });

    return null;
  }
};

export default getData;
