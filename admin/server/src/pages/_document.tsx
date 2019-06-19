// typescript import
import { NextDocumentContext } from 'next/document';

// import
import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';

// definition
export default class Document extends NextDocument {
  public static getInitialProps = async (ctx: NextDocumentContext) => ({
    ...(await NextDocument.getInitialProps(ctx)),
  });

  public render(): React.ReactNode {
    return (
      <html lang="zh">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/apple-touch-icon.png"
          />
        </Head>

        <body id="meepshop">
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}
