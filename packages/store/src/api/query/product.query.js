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
    src
  }
  galleries {
    images {
      fileId
      isMain
      src
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
}`;

export default productQuery;
