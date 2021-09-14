/**
 * @name getReqArgs
 * @argument {Object} req requset or window
 */
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { STORE_DOMAIN },
} = getConfig();

export default req => {
  if (typeof window === 'undefined') {
    const userAgent = req.get?.('user-agent');

    return {
      XMeepshopDomain: req.headers.host,
      userAgent,
    };
  }

  return {
    XMeepshopDomain: STORE_DOMAIN || window.location.host,
    userAgent: window.navigator.userAgent,
  };
};
