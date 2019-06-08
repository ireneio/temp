import React from 'react';
import PropTypes from 'prop-types';
import htmlescape from 'htmlescape';
import Head from 'next/head';

export default class extends React.Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      fbPixelId: PropTypes.string,
      gtmID: PropTypes.string,
      webMasterID: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string,
  };

  static defaultProps = { fbAppId: null };

  componentDidMount() {
    /* Google Tag Manager (noscript) */
    if (!window.meepShopStore.gtmIsInstalled) {
      const { pageAdTrackIDs } = this.props;
      const gtmNoscript = document.createElement('noscript');

      gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${pageAdTrackIDs.gtmID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(gtmNoscript);
      window.meepShopStore.gtmIsInstalled = true;
    } /* Google Tag Manager (noscript) - End */

    if (!window.meepShopStore.fbSdkIsInstalled) {
      const { fbAppId = null } = this.props;
      /* eslint-disable */
      window.fbAsyncInit = function() {
        FB.init({
          appId: fbAppId,
          cookie: true,
          xfbml: true,
          version: 'v3.0',
        });
        window.meepShopStore.fbSdkIsInstalled = true;
        FB.AppEvents.logPageView();
      };
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
      /* eslint-enable */
    }
  }

  render() {
    const { pathname, pageAdTrackIDs } = this.props;
    const {
      gaID = null,
      gtmID = null,
      webMasterID = null,
      fbPixelId = null,
      googleAdsConversionID = null,
    } = pageAdTrackIDs;
    return (
      <Head>
        {/* site verification for google search console */}
        {webMasterID && (
          <meta name="google-site-verification" content={`${webMasterID}`} />
        )}

        {/* eslint-disable react/no-danger */}
        {/* <!-- Facebook Pixel Code --> */}
        {fbPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${htmlescape(fbPixelId)});
            fbq('track', "PageView");
          `,
            }}
          />
        )}
        {fbPixelId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1"
            />
          `,
            }}
          />
        )}
        {/* <!-- End - Facebook Pixel Code --> */}

        {/* <!-- Global site tag (gtag.js) - Google Analytics / Google Adwords --> */}
        {(gaID || googleAdsConversionID) && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaID ||
              googleAdsConversionID}`}
          />
        )}
        {(gaID || googleAdsConversionID) && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${
              gaID
                ? `gtag('config', ${htmlescape(gaID)}, {page_path: ${htmlescape(
                    pathname,
                  )}});`
                : ''
            }
            ${
              googleAdsConversionID
                ? `gtag('config', ${htmlescape(googleAdsConversionID)});`
                : ''
            }
          `,
            }}
          />
        )}
        {/* <!-- End Global site tag (gtag.js) - Google Analytics / Google Adwords --> */}

        {/* <!-- Google Tag Manager --> */}
        {gtmID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',${htmlescape(gtmID)});
          `,
            }}
          />
        )}
        {/* <!-- End Google Tag Manager --> */}
      </Head>
    );
  }
}
