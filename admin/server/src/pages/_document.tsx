// import
import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { globalEvents } from '@meepshop/context/lib/Events';
import {
  adminFavicon,
  adminAppleTouchIcon_w180_h180 as adminAppleTouchIcon,
} from '@meepshop/images';

// definition
export default class Document extends NextDocument {
  public render(): JSX.Element {
    return (
      <Html lang="zh">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="shortcut icon" type="image/x-icon" href={adminFavicon} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={adminAppleTouchIcon}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: globalEvents,
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
