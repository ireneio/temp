import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';

export default class MyDocument extends Document {
  static async getInitialProps({ req, res, renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();

    res.append('Cache-Control', 'no-cache, no-store, must-revalidate');

    return {
      html,
      head,
      errorHtml,
      chunks,
      XMeepshopDomain: req.get('x-meepshop-domain'),
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

          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <body id="meepshop">
          <Main />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.meepShopStore = {
                  XMeepshopDomain: ${htmlescape(XMeepshopDomain)}
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
