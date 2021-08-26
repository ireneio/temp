import gql from 'graphql-tag';

export const getContextData = gql`
  query getContextData {
    viewer {
      id
      name
      email
      additionalInfo {
        mobile
      }
      address {
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        zipCode
        street
      }
      role
      memberGroup {
        id
        name
      }

      wishList: wishlist {
        id
        productId
      }

      store {
        id
        cname
        description {
          name
        }
        shippableCountries {
          id
        }
        experiment {
          hiddingMeepshopMaxInFooterEnabled
        }
        setting {
          locale
          currency
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
      }
    }

    getStockNotificationList {
      data {
        variantId
      }
    }

    getColorList {
      data {
        id
        imgInfo {
          used
          repeat
          size
          image {
            id
            scaledSrc {
              w1920
            }
          }
        }
      }
    }
  }
`;