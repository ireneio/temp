import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { PRODUCTION, DOMAIN },
} = getConfig();

export default class MyDocument extends Document {
  static async getInitialProps({ req, renderPage }) {
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

  render() {
    return (
      /* eslint-disable */
      <html lang="en">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* TODO: check if the browser needs babel-polyfill */}
          <script
            defer
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.4.1/antd.min.css"
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
