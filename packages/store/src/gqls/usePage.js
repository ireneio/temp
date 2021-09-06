import gql from 'graphql-tag';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { handleModuleDataMenuFragment } from '@meepshop/meep-ui/lib/menu/gqls/handleModuleData';

const usePageFragment = gql`
  fragment usePageFragment on Page {
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
  query getPage($identity: String, $isHomePage: Boolean!) {
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
          ...usePageFragment
        }
        experiment {
          isNewPageModulesEnabled
        }
      }
    }
  }

  ${usePageFragment}
`;
