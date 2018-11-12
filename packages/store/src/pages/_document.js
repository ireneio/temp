import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { PRODUCTION, DOMAIN },
} = getConfig();

export default class MyDocument extends Document {
  static async getInitialProps({ req, res, renderPage }) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
    const { html, head, errorHtml, chunks } = renderPage();
    return {
      html,
      head,
      errorHtml,
      chunks,
      XMeepshopDomain,
    };
  }

  getLang = data =>
    (
      data?.props?.initialState?.storeReducer?.settings?.localeOptions?.[0] ||
      'zh-TW'
    ).replace('_', '-');

  render() {
    const { __NEXT_DATA__: storeData } = this.props;
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
              window.meepShopStore = { XMeepshopDomain: ${htmlescape(
                PRODUCTION,
              )} ? ${htmlescape(this.props.XMeepshopDomain)} : ${htmlescape(
                DOMAIN,
              )} };
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
