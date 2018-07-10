const activityQuery = `
id
appId
type
plugin
title {
  zh_TW
  en_US
}
rule {
  type
  settingType
  discount {
    condition
    method
    methodlist
    value
    products {
      productId
      variantId
      quantity
      specs{
        id
        title {
          zh_TW
          en_US
        }
      }
      title {
        zh_TW
        en_US
      }
    }
    minmum
    maxmum
    intival
  }
}
couponSetting {
  useTimesType
  useTimes
  codeType
  singleCode
  codeCount
}
target {
  tags
  products {
    productId
    amount
  }
  groups {
    id
    title {
      zh_TW
      en_US
    }
    tags
    products {
      productId
    }
    method
    value
    operator
    params {
      tags
      price {
        gte
        lte
      }
      search
      includedAllTags
    }
  }
}
groupIds
shipmentIds
joinDiscountIds
status
sort
startTime
endTime
`;

export default activityQuery;
