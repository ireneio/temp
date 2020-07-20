import initApollo from '@meepshop/apollo/lib/initApollo';

// for api server to auth
export default async function(response) {
  let data;
  try {
    const res = await fetch('/fbAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(response),
    });

    if (res.status === 200) {
      data = await res.json();
      // FIXME: should signout with apollo
      initApollo({ name: 'store' }).resetStore();

      switch (data.code) {
        case 200: // 登入成功
          return { status: 200 };
        case 201: // 第一次登入成功
          return { status: 201, msg: 'success' };
        case 2010: // fb access token 失效
          return { status: 2010 };
        case 2011: // fb 登入無法取得email
          return { status: 2011 };
        case 2003: // 無法取得meepshop token
          return { status: 2003 };
        default:
          // 未知的錯誤
          return { status: 9999 };
      }
    } else {
      throw new Error(`fbLgoin.api => ${res.status}: ${res.statusText}`);
    }
  } catch (error) {
    return { error: error.message };
  }
}
