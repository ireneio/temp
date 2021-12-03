import { gql } from '@apollo/client';

import { handleModuleDataMenuFragment } from '@meepshop/meep-ui/lib/menu/gqls/handleModuleData';

export const getTemplatesMenus = gql`
  query getTemplatesMenus {
    viewer {
      id
      store {
        id
        fixedtop: menu(id: "fixedtop") {
          id
          ...handleModuleDataMenuFragment
        }

        secondtop: menu(id: "secondtop") {
          id
          ...handleModuleDataMenuFragment
        }

        sidebar: menu(id: "sidebar") {
          id
          ...handleModuleDataMenuFragment
        }

        fixedbottom: menu(id: "fixedbottom") {
          id
          ...handleModuleDataMenuFragment
        }
      }
    }
  }

  ${handleModuleDataMenuFragment}
`;
