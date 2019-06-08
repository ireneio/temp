const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = async ctx => {
  try {
    /* Get FB app secret */
    const appIdResponse = await fetch(`${API_HOST}/graphql`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-meepshop-domain': ctx.headers['x-meepshop-domain'],
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `
          query getAppLogin {
            getAppLoginList {
              data {
                appId
                appSecret
              }
            }
          }
        `,
      }),
    });

    if (appIdResponse.status >= 400)
      throw new Error(
        `${appIdResponse.status}: ${appIdResponse.statusText}(${appIdResponse})`,
      );

    /* Get FB app secret - End */
    const data = await appIdResponse.json();
    const appId =
      data &&
      data.data.getAppLoginList &&
      data.data.getAppLoginList.data.length > 0 &&
      data.data.getAppLoginList.data[0].appId;
    const appSecret =
      data &&
      data.data.getAppLoginList &&
      data.data.getAppLoginList.data.length > 0 &&
      data.data.getAppLoginList.data[0].appSecret;

    if (!appSecret) throw new Error('No app secret.');

    /* Handle error */
    const errorArr = ctx.url.match(/(error)=(.*?)(?=&)/gm);
    const error = errorArr && errorArr[0].split('=')[1];
    const errorReasonArr = ctx.url.match(/(error_reason)=(.*?)(?=&)/gm);
    const errorReason = errorReasonArr && errorReasonArr[0].split('=')[1];

    if (error) throw new Error(`${error}: ${errorReason}`);
    /* Handle error - End */

    /* Parse code & state */
    const codeArr = ctx.url.match(/code=(.*?)(?=&)/gm);
    const code = codeArr && codeArr[0].split('=')[1];
    const stateArr = ctx.url.match(/&(.*?)$/gm);
    const state = stateArr && stateArr[0].split('=')[1];

    if (!state.match(/meepShopNextStore/gm))
      throw new Error('State is not matched!');

    const fbApi = `https://graph.facebook.com/v3.0/oauth/access_token?client_id=${appId}&redirect_uri=https://${
      ctx.headers['x-meepshop-domain']
    }/fbAuthForLine&client_secret=${appSecret}&code=${code}`;
    const responseFromFB = await fetch(fbApi, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    const dataFromFB = await responseFromFB.json();

    if (responseFromFB.status !== 200)
      throw new Error(`${responseFromFB.status}: ${responseFromFB.statusText}`);

    const responseApi = await fetch(`${API_HOST}/facebook/fbLogin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-meepshop-domain': ctx.headers['x-meepshop-domain'],
        'x-meepshop-authorization-token':
          ctx.headers['x-meepshop-authorization-token'],
      },
      credentials: 'include',
      body: JSON.stringify({ accessToken: dataFromFB.access_token }),
    });

    if (responseApi.status !== 200)
      throw new Error(`${responseApi.status}: ${responseApi.statusText}`);

    const dataApi = await responseApi.json();

    if (dataApi.code === 200 || dataApi.code === 201)
      ctx.cookies.set(
        'x-meepshop-authorization-token',
        responseApi.headers.get('x-meepshop-authorization-token'),
        {
          maxAge: 86400 * 1 * 1000,
          path: '/',
          httpOnly: true,
        },
      );
    else throw new Error(`${dataApi.code}-${dataApi._error}`); // eslint-disable-line

    /* Redirect back to website by condition */
    ctx.status = 302;
    if (state.match(/cart/gm)) ctx.redirect('/checkout');
    else ctx.redirect('/login');
    /* Redirect back to website by condition - End */
  } catch (error) {
    console.log(
      `Error: ${error.message}, Stack: ${JSON.stringify(error.stack)}`,
    );
    ctx.status = 301;
    ctx.redirect(`/login?error=${error.message}`);
  }
};
