/* eslint-disable no-console */

const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = async (req, res) => {
  try {
    /* Get FB app secret */
    const appIdResponse = await fetch(`${API_HOST}/graphql`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-meepshop-domain': req.get('x-meepshop-domain'),
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `
          query getAppLogin {
            viewer {
              id
              store {
                id
                facebookSetting {
                  appId
                  appSecret
                }
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
    const { appId, appSecret } =
      data &&
      data.viewer &&
      data.viewer.store &&
      data.viewer.store.facebookSetting;

    if (!appSecret) throw new Error('No app secret.');

    /* Handle error */
    const errorArr = req.originalUrl.match(/(error)=(.*?)(?=&)/gm);
    const error = errorArr && errorArr[0].split('=')[1];
    const errorReasonArr = req.originalUrl.match(/(error_reason)=(.*?)(?=&)/gm);
    const errorReason = errorReasonArr && errorReasonArr[0].split('=')[1];

    if (error) throw new Error(`${error}: ${errorReason}`);
    /* Handle error - End */

    /* Parse code & state */
    const codeArr = req.originalUrl.match(/code=(.*?)(?=&)/gm);
    const code = codeArr && codeArr[0].split('=')[1];
    const stateArr = req.originalUrl.match(/&(.*?)$/gm);
    const state = stateArr && stateArr[0].split('=')[1];

    if (!state.match(/meepShopNextStore/gm))
      throw new Error('State is not matched!');

    const fbApi = `https://graph.facebook.com/v3.0/oauth/access_token?client_id=${appId}&redirect_uri=https://${req.get(
      'host',
    )}/fbAuthForLine&client_secret=${appSecret}&code=${code}`;
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
        'x-meepshop-domain': req.get('x-meepshop-domain'),
        'x-meepshop-authorization-token': req.get(
          'x-meepshop-authorization-token',
        ),
      },
      body: JSON.stringify({ accessToken: dataFromFB.access_token }),
    });

    if (responseApi.status !== 200)
      throw new Error(`${responseApi.status}: ${responseApi.statusText}`);

    const dataApi = await responseApi.json();

    if (dataApi.code === 200 || dataApi.code === 201) {
      res.cookie(
        'x-meepshop-authorization-token',
        responseApi.headers.get('x-meepshop-authorization-token'),
        {
          maxAge: 86400 * 1 * 1000,
          httpOnly: true,
        },
      );
      res.cookie(
        `x-meepshop-authorization-token-${req.get('x-meepshop-domain')}`,
        '',
        {
          maxAge: 0,
          httpOnly: true,
        },
      );
    } else {
      throw new Error(`${dataApi.code}-${dataApi._error}`); // eslint-disable-line
    }

    /* Redirect back to website by condition */
    if (state.match(/cart/gm)) res.redirect('/checkout');
    else res.redirect('/login');
    /* Redirect back to website by condition - End */
  } catch (error) {
    console.log(
      `Error: ${error.message}, Stack: ${JSON.stringify(error.stack)}`,
    );
    res.redirect(301, `/login?error=${error.message}`);
  }
};
