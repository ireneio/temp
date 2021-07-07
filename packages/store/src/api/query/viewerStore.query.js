const viewerStoreQuery = `
  viewer {
    id
    store {
      id
      name
      cname
      domain
      description {
        name
        introduction
      }
      timezone
      contact {
        name
        email
        mobile
        tel
      }
      shippableCountries {
        id
      }
      setting {
        order {
          autoAddStock
          afterPaymentFail
        }
        invoice {
          paper {
            duplicate {
              isEnabled
            }
            triplicate {
              isEnabled
            }
            donation {
              isEnabled
            }
          }
          electronic {
            triplicate {
              isEnabled
            }
            donation {
              isEnabled
            }
            membershipCarrier {
              isEnabled
            }
            citizenDigitalCertificateCarrier {
              isEnabled
            }
            mobileBarCodeCarrier {
              isEnabled
            }
            type
          }
        }
        paidMessage
        adRetentionMilliseconds
        adRetentionMillisecondsEnabled
        shopperLoginMessageEnabled
        shopperLoginMessage
      }
      logoImage {
        id
        scaledSrc {
          h200
        }
      }
      mobileLogoImage {
        id
        scaledSrc {
          w250
        }
      }
      faviconImage {
        id
        scaledSrc {
          w60
        }
      }
      experiment {
        hiddingMeepshopMaxInFooterEnabled
      }
    }
  }
`;

export default viewerStoreQuery;
