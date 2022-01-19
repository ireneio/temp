import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps({ req, res, renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();

    if (res.append) {
      res.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    }

    return {
      html,
      head,
      errorHtml,
      chunks,
      XMeepshopDomain: req.headers.host,
      lang: req.language,
    };
  }

  render() {
    const { lang } = this.props;

    return (
      /* eslint-disable */
      <Html lang={lang}>
        <Head />

        <body id="meepshop">
          <Main />

          <NextScript />
        </body>
      </Html>
      /* eslint-disable */
    );
  }
}
