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
    currency
    contact {
      name
      email
      mobile
      tel
    }
    locale
    setting {
      order {
        autoAddStock
        afterPaymentFail
      }
      cart {
        cartlock
        cartlockTime
      }
      design {
        footerSite
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
          isEnabled
          type
        }
      }
      locale
      currency
      lockedCountry
      lockedBirthday
      paidMessage
      activityVersion
      adRetentionMilliseconds
      adRetentionMillisecondsEnabled
    }
    logoImage {
      src
    }
    mobileLogoImage {
      src
    }
    faviconImage {
      src
    }
    homePageId

    experiment {
      hiddingMeepshopMaxInFooterEnabled
    }

    memberGroups(filter: $memberGroupFilter) {
      id
      name
      type
    }
  }
}
`;

export default viewerStoreQuery;
