import localeQuery from './locale.query';

const fixedtopQuery = `
  module
  height
  alignment
  showTitle
  showLogo
  title {
    ${localeQuery}
  }
  color
  background
  activeColor
  hoverColor
  menuId
  opacity
  fontSize
`;

const secondtopQuery = `
  module
  height
  alignment
  title {
    ${localeQuery}
  }
  showTitle
  showLogo
  menuId
  color
  background
  fontSize
`;

const sidebarQuery = `
  module
  width
  alignment
  color
  background
  title {
    ${localeQuery}
  }
  showTitle
  menuId
  fontSize
`;

const fixedbottomQuery = `
  module
  title {
    ${localeQuery}
  }
  menuId
  color
  background
  fontSize
`;

const pageQuery = `
  id
  title {
    ${localeQuery}
  }
  fixedtop {
    ${fixedtopQuery}
  }
  secondtop {
    ${secondtopQuery}
  }
  sidebar {
    ${sidebarQuery}
  }
  fixedbottom {
    ${fixedbottomQuery}
  }
  notBeDeleted
  path
  pageType
  useExternalLink
  openNewWindow
  addressTitle
  seo {
    keywords
    description
    image
  }
  container
  width
  useBottom
  background
  blocks:blocksRaw
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
`;

export default pageQuery;
