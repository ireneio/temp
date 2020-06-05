import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
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
      lang: req.language,
    };
  }

  render() {
    const { XMeepshopDomain, lang } = this.props;

    return (
      /* eslint-disable */
      <Html lang={lang}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: 'var events = new EventTarget();',
            }}
          />
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
      </Html>
      /* eslint-disable */
    );
  }
}
