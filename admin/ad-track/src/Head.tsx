// import
import React from 'react';
import Script from 'next/script';
import Head from 'next/head';

// definition
export default React.memo(() => (
  <>
    {/* Facebook Pixel */}
    <Script
      id="facebook-pixel-config"
      dangerouslySetInnerHTML={{
        __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '222744027936443');
          `,
      }}
    />
    <Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
              <img
                src="https://www.facebook.com/tr?id=222744027936443&ev=PageView&noscript=1"
                height="1"
                width="1"
                style="display:none"
              />
            `,
        }}
      />
    </Head>

    {/* Google Adwords */}
    <Script
      id="google-adwords-js"
      strategy="lazyOnload"
      src="https://www.googletagmanager.com/gtag/js?id=AW-986719315"
    />
    <Script
      id="google-adwords-config"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
      }}
    />

    {/* Google Analytics */}
    <Script
      id="google-analytics-js"
      strategy="lazyOnload"
      src="https://www.googletagmanager.com/gtag/js?id=UA-41718901-5"
    />
    <Script
      id="google-analytics-config"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
      }}
    />
  </>
));
