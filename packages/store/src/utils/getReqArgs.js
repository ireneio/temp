/**
 * @name getReqArgs
 * @argument {Object} req requset or window
 */

export default req => {
  if (typeof window === 'undefined') {
    const userAgent = req.headers['user-agent'];

    return {
      XMeepshopDomain: req.headers.host,
      userAgent,
    };
  }

  return {
    XMeepshopDomain:
      process.env.NEXT_PUBLIC_STORE_DOMAIN || window.location.host,
    userAgent: window.navigator.userAgent,
  };
};
