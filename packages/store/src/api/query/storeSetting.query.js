const storeSettingQuery = `
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
  logoId
  mobileLogoId
  faviconId
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
  logoFileInfo {
    id
    linkId
    type
    image
  },
  mobileLogoFileInfo {
    id
    linkId
    type
    image
  },
  faviconFileInfo {
    id
    linkId
    type
    image
  }
  homePageId
`;

export default storeSettingQuery;
