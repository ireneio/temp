/**
 * @name getReqArgs
 * @argument {boolean} isServer is server side or client sode
 * @argument {Object} resource requset or window
 */
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { DOMAIN, PRODUCTION },
} = getConfig();

export default (isServer, req) => {
  if (isServer) {
    const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
    // const XMeepshopDomain = DOMAIN;
    const userAgent = req.headers['user-agent'];
    const { cookie } = req.headers;
    return { XMeepshopDomain, userAgent, cookie };
  }
  const XMeepshopDomain = PRODUCTION ? window.location.host : DOMAIN;
  // const XMeepshopDomain = DOMAIN;
  const { userAgent } = window.navigator;
  return { XMeepshopDomain, userAgent };
};
