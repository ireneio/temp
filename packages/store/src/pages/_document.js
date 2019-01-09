import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { STORE_DOMAIN },
} = getConfig();

export default class MyDocument extends Document {
  static async getInitialProps({ req, res, renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    return {
      html,
      head,
      errorHtml,
      chunks,
      XMeepshopDomain: req.headers['x-meepshop-domain'],
    };
  }

  getLang = data =>
    (
      data?.props?.initialState?.storeReducer?.settings?.localeOptions?.[0] ||
      'zh-TW'
    ).replace('_', '-');

  render() {
    const { __NEXT_DATA__: storeData, XMeepshopDomain } = this.props;
    const lang = this.getLang(storeData) || 'zh-TW';

    return (
      /* eslint-disable */
      <html lang={lang}>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.10.3/antd.min.css"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.meepShopStore = {
                  XMeepshopDomain: ${htmlescape(
                    STORE_DOMAIN || XMeepshopDomain,
                  )}
                };
              `,
            }}
          />
          <NextScript />
        </body>
      </html>
      /* eslint-disable */
    );
  }
}
