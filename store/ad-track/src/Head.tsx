// import
import React, { useContext, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import CookiesContext from '@meepshop/cookies';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { headFragment as headFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  adTracks: headFragmentType;
  fbq: NonNullable<typeof window.fbq>;
}

// definition
export default React.memo(
  ({
    adTracks: {
      googleSearchConsoleVerificationHtml,
      googleMerchantCenterVerificationCode,
      facebookPixelId,
      googleAnalyticsId,
      googleAdwordsConfig,
      googleTagManager,
    },
    fbq,
  }: PropsType) => {
    const { cookies } = useContext(CookiesContext);
    const router = useRouter();
    const prevHrefRef = useRef('');

    useEffect(() => {
      if (router.asPath !== prevHrefRef.current) {
        prevHrefRef.current = router.asPath;
        fbq('track', 'PageView');
      }
    }, [fbq, router.asPath]);

    return (
      <>
        <Head>
          {!googleSearchConsoleVerificationHtml ? null : (
            <meta
              content={googleSearchConsoleVerificationHtml}
              name="google-site-verification"
            />
          )}

          {!googleMerchantCenterVerificationCode ? null : (
            <meta
              content={googleMerchantCenterVerificationCode}
              name="google-site-verification"
            />
          )}
        </Head>

        {!facebookPixelId ? null : (
          <>
            <Script
              id="facebook-pixel-config"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}(window,document,'script');

                  fbq('init', '${facebookPixelId}', {
                    external_id: '${cookies.identity}'
                  }, { agent: 'plmeepShop' });
                `,
              }}
            />
            <Script
              id="facebook-pixel-js"
              strategy="lazyOnload"
              src="https://connect.facebook.net/en_US/fbevents.js"
            />
            <Head>
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
            </Head>
          </>
        )}

        {!googleAnalyticsId && !googleAdwordsConfig ? null : (
          <>
            <Script
              id="google-analytics-js"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId ||
                googleAdwordsConfig}`}
            />

            <Script
              id="google-adwords-config"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  ${
                    !googleAnalyticsId
                      ? ''
                      : `gtag('config', '${googleAnalyticsId}', { page_path: '${router.asPath}' });`
                  }
                  ${
                    !googleAdwordsConfig
                      ? ''
                      : `gtag('config', '${googleAdwordsConfig}');`
                  }
                `,
              }}
            />
          </>
        )}

        {!googleTagManager ? null : (
          <>
            <Script
              id="google-tag-manager"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${googleTagManager}');
                `,
              }}
            />
            <Head>
              <noscript
                dangerouslySetInnerHTML={{
                  __html: `
                      <iframe
                        src="https://www.googletagmanager.com/ns.html?id=${googleTagManager}"
                        height="0"
                        width="0"
                        style="display:none;visibility:hidden"
                      />
                    `,
                }}
              />
            </Head>
          </>
        )}
      </>
    );
  },
);
