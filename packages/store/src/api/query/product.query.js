import pageQuery from './page.query';

const productQuery = `{
  id
  title{
    zh_TW
    en_US
  }
  description {
    zh_TW
    en_US
  }
  info {
    zh_TW
    en_US
  }
  draftText {
    value
  }
  videoLink {
    value
  }
  variantInfo {
    sku
    listPrice
    retailPrice
    suggestedPrice
    stock
    cost
    vendorSku
    maxPurchaseLimit
    minPurchaseItems
    weight {
      weight
      unit
    }
    size {
      width
      height
      depth
      unit
    }
    warehouseNumber
    minRetailPrice
  }
  coverImage {
    fileId
    scaledSrc {
      w60
      w120
      w240
      w480
      w720
      w960
      w1200
      w1440
      w1680
      w1920
    }
  }
  galleries {
    images {
      fileId
      isMain
      scaledSrc {
        w60
        w120
        w240
        w480
        w720
        w960
        w1200
        w1440
        w1680
        w1920
      }
    }
  }
  tags
  variants {
    id
    sku
    listPrice
    retailPrice
    suggestedPrice
    discountPrice
    totalPrice
    specs {
      id
      specId
      title {
        zh_TW
        en_US
      }
    }
    stock
    cost
    vendorSku
    maxPurchaseLimit
    minPurchaseItems
    warehouseNumber
    status
  }
  supplier
  purchasable
  purchasableTime {
    start
    end
  }
  specs {
    id
    title {
      zh_TW
      en_US
    }
  }
  _error
  status
  showUserPrice {
    showListPrice
    showSuggestedPrice
  }
  page {
    ${pageQuery}
  }
  applicableActivities {
    title {
      zh_TW
    }
    discountPrice
  }
}`;

export default productQuery;
