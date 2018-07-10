const storeSettingQuery = `
name
cname
domain
description {
  name
  introduction
}
storeStatus
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
    duplicate {
      status
    }
    triplicate {
      status
    }
    eInvoice {
      status
    }
    donate {
      status
      units
    }
  }
  locale
  currency
  lockedCountry
  lockedBirthday
  paidMessage
  activityVersion
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
setting {
  lockedCountry
}
`;

export default storeSettingQuery;
