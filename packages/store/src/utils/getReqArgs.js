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
    const userAgent = req.get('user-agent');

    return {
      XMeepshopDomain: req.get('x-meepshop-domain'),
      userAgent,
    };
  }

  const { userAgent } = window.navigator;
  return {
    XMeepshopDomain: STORE_DOMAIN || window.location.host,
    userAgent,
  };
};
