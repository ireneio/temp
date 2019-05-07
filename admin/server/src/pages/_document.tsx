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
        <Head />

        <body id="meepshop">
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}
