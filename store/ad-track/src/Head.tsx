// import
import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';

import { useRouter } from '@meepshop/link';

// graphql typescript
import { headFragment as headFragmentType } from './__generated__/headFragment';

// typescript definition
interface PropsType {
  adTrack: headFragmentType;
}

// definition
export const headFragment = gql`
  fragment headFragment on StoreAdTrack {
    googleSearchConsoleVerificationHtml
    facebookPixelId
    googleAnalyticsId
    googleAdwordsConfig {
      extractedId
    }
    googleTagManager {
      extractedId
    }
  }
`;

export default React.memo(
  ({
    adTrack: {
      googleSearchConsoleVerificationHtml,
      facebookPixelId,
      googleAnalyticsId,
      googleAdwordsConfig,
      googleTagManager,
    },
  }: PropsType) => {
    const router = useRouter();

    return (
      <Head>
        {!googleSearchConsoleVerificationHtml ? null : (
          <meta
            content={googleSearchConsoleVerificationHtml}
            name="google-site-verification"
          />
        )}

        {!facebookPixelId ? null : (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                  document,'script','https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${facebookPixelId}', {}, { agent: 'plmeepShop' });
                  fbq('track', 'PageView');
                `,
              }}
            />

            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                  <img
                    src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"
                    height="1"
                    width="1"
                    style="display:none"
                  />
                `,
              }}
            />
          </>
        )}

        {!googleAnalyticsId && !googleAdwordsConfig.extractedId ? null : (
          <>
            <script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId ||
                googleAdwordsConfig.extractedId}`}
              async
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  ${
                    !googleAnalyticsId
                      ? ''
                      : `gtag('config', '${googleAnalyticsId}', { page_path: '${router.pathname}' });`
                  }
                  ${
                    !googleAdwordsConfig.extractedId
                      ? ''
                      : `gtag('config', '${googleAdwordsConfig.extractedId}');`
                  }
                `,
              }}
            />
          </>
        )}

        {!googleTagManager.extractedId ? null : (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${googleTagManager.extractedId}');
                `,
              }}
            />

            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                  <iframe
                    src="https://www.googletagmanager.com/ns.html?id=${googleTagManager.extractedId}"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                  />
                `,
              }}
            />
          </>
        )}
      </Head>
    );
  },
);