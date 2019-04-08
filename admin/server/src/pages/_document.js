import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static getInitialProps = async ctx => ({
    ...(await NextDocument.getInitialProps(ctx)),
  });

  render() {
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
