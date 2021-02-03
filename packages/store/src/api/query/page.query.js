import localeQuery from './locale.query';
import menuQuery from './menu.query';

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
  menu {
    ${menuQuery}
  }
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
  menu {
    ${menuQuery}
  }
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
  menu {
    ${menuQuery}
  }
  fontSize
`;

const fixedbottomQuery = `
  module
  title {
    ${localeQuery}
  }
  menu {
    ${menuQuery}
  }
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
