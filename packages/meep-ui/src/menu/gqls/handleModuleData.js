import { gql } from '@apollo/client';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

const handleModuleDataMenuPageObjectTypeFragment = gql`
  fragment handleModuleDataMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    title {
      ...localeFragment
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
  }

  ${localeFragment}
`;

export const handleModuleDataMenuFragment = gql`
  fragment handleModuleDataMenuFragment on Menu {
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
      id
      pages {
        id
        pages {
          id
          ...handleModuleDataMenuPageObjectTypeFragment
        }
        ...handleModuleDataMenuPageObjectTypeFragment
      }
      ...handleModuleDataMenuPageObjectTypeFragment
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
      normal: nornal {
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
  }

  ${handleModuleDataMenuPageObjectTypeFragment}
`;

export const getMenu = gql`
  query getMenu($menuId: String) {
    viewer {
      id
      store {
        id
        menu(id: $menuId) {
          id
          ...handleModuleDataMenuFragment
        }
      }
    }
  }

  ${handleModuleDataMenuFragment}
`;
