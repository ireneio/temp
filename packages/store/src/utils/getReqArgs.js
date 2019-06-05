/**
 * @name getReqArgs
 * @argument {boolean} isServer is server side or client sode
 * @argument {Object} req requset or window
 */
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { STORE_DOMAIN },
} = getConfig();

export default (isServer, req) => {
  if (isServer) {
    const userAgent = req.headers['user-agent'];
    const { cookie } = req.headers;

    return {
      XMeepshopDomain: req.headers['x-meepshop-domain'],
      userAgent,
      cookie,
    };
  }

  const { userAgent } = window.navigator;
  return {
    XMeepshopDomain: STORE_DOMAIN || window.location.host,
    userAgent,
  };
};
