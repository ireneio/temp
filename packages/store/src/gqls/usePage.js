import { gql } from '@apollo/client';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { handleModuleDataMenuFragment } from '@meepshop/meep-ui/lib/menu/gqls/handleModuleData';

const usePageProductFragment = gql`
  fragment usePageProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    description {
      ...localeFragment
    }
    info {
      ...localeFragment
    }
    draftText {
      value
    }
    videoLink {
      value
    }
    coverImage {
      id
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
        id
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
        imageExists
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
          ...localeFragment
        }
      }
      cost
      vendorSku
      warehouseNumber
      status
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
    _error
    status
    showUserPrice {
      showListPrice
      showSuggestedPrice
    }
    applicableActivities {
      title {
        ...localeFragment
      }
      discountPrice
    }
  }

  ${localeFragment}
`;

export const usePagePageFragment = gql`
  fragment usePagePageFragment on Page {
    __typename # use for checking apollo-client
    id
    title {
      ...localeFragment
    }

    fixedtop {
      module
      height
      alignment
      showTitle
      showLogo
      color
      background
      activeColor
      hoverColor
      opacity
      fontSize
      title {
        ...localeFragment
      }
      menu {
        id
        ...handleModuleDataMenuFragment
      }
    }

    secondtop {
      module
      height
      alignment
      showTitle
      showLogo
      color
      background
      fontSize
      title {
        ...localeFragment
      }
      menu {
        id
        ...handleModuleDataMenuFragment
      }
    }

    sidebar {
      module
      width
      alignment
      color
      background
      showTitle
      fontSize
      title {
        ...localeFragment
      }
      menu {
        id
        ...handleModuleDataMenuFragment
      }
    }

    fixedbottom {
      module
      color
      background
      fontSize
      title {
        ...localeFragment
      }
      menu {
        id
        ...handleModuleDataMenuFragment
      }
    }

    notBeDeleted
    path
    pageType
    useExternalLink
    openNewWindow
    tabTitle

    seo {
      keywords
      description
      image
    }

    container
    width
    useBottom
    background
    blocks: blocksRaw

    smartConversionModule {
      id
      displaySample(token: $identity) {
        eventName
        image {
          id
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
      width
      align
      imageAlt
      page {
        id
      }
    }
  }

  ${localeFragment}
  ${handleModuleDataMenuFragment}
`;

export const getPage = gql`
  query getPage(
    $identity: String
    $path: String!
    $productSearch: searchInputObjectType
    $isHomePage: Boolean!
    $isCustomPage: Boolean!
    $isProductPage: Boolean!
    $isProductsPage: Boolean!
  ) {
    computeProductList(search: $productSearch) @include(if: $isProductPage) {
      data {
        id
        status
        coverImage {
          id
          scaledSrc {
            w480
          }
        }
        title {
          ...localeFragment
        }
        page {
          id
          ...usePagePageFragment
        }
        ...usePageProductFragment
      }
    }
    viewer {
      id
      store {
        id
        description {
          name
          introduction
        }
        logoImage {
          id
          scaledSrc {
            w240
          }
        }
        faviconImage {
          id
          scaledSrc {
            w60
          }
        }
        defaultHomePage @include(if: $isHomePage) {
          id
          ...usePagePageFragment
        }
        customPage(path: $path) @include(if: $isCustomPage) {
          id
          ...usePagePageFragment
        }
        defaultProductListPage @include(if: $isProductsPage) {
          id
          ...usePagePageFragment
        }
      }
    }
  }

  ${localeFragment}
  ${usePagePageFragment}
  ${usePageProductFragment}
`;
