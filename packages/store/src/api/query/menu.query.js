// Wait for api to correct typo (nornal)
const menuPagesQuery = `
  id
  title {
    zh_TW
    en_US
  }
  action
  params {
    path
    pageId
    url
    section
    query_string
    tags
    sort {
      field
      order
    }
    price {
      lte
      gte
    }
    from
    size
    displayMemberGroup
  }
  image {
    __typename
    ... on Image {
      id
      scaledSrc {
        w60
        w120
        w240
      }
    }

    ... on DefaultIcon {
      icon
    }
  }
  imagePosition
  newWindow
`;

const menuQuery = `
  id
  title {
    zh_TW
    en_US
  }
  notBeDeleted
  menuType
  iconSize
  logoAlignment
  pages {
    ${menuPagesQuery}
    pages {
      ${menuPagesQuery}
      pages {
        ${menuPagesQuery}
        pages {
          ${menuPagesQuery}
          pages {
            ${menuPagesQuery}
          }
        }
      }
    }
  }
  design {
    pattern
    width
    height
    opacity
    font
    fontSize
    showLogo
    showTitle
    showSearchbar
    alignment
    paddingTop
    expandSubItem
    normal:nornal {
      color
      background
      borderColor
    }
    hover {
      color
      background
      borderColor
    }
    active {
      color
      background
      borderColor
    }
  }
  status
`;

export default menuQuery;
