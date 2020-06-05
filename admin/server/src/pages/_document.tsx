// import
import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

// definition
export default class Document extends NextDocument {
  public render(): JSX.Element {
    return (
      <Html lang="zh">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/images/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: 'var events = new EventTarget();',
            }}
          />
        </Head>

        <body id="meepshop">
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
