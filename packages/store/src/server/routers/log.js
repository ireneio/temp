module.exports = ctx => {
  const XMeepshopDomain = ctx.host;
  const { data } = ctx.request.body;
  console.log(`#LOG#(${XMeepshopDomain}) >>>  ${JSON.stringify(data)}`);
  ctx.status = 200;
  ctx.body = 'ok';
};
