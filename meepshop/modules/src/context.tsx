// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

// graphql typescript
import { ContextType as MenuContextType } from '@meepshop/menu/lib/fragment';

import { contextUserFragment as contextUserFragmentType } from './__generated__/contextUserFragment';

// graphql import
import { menuUserFragment } from '@meepshop/menu/lib/fragment';

// typescript definition
type ModuleNamesType =
  | 'DividerModule'
  | 'DraftTextModule'
  | 'FacebookWallModule'
  | 'GoogleMapModule'
  | 'IframeModule'
  | 'ImageModule'
  | 'ImageTextModule'
  | 'ProductDraftTextModule'
  | 'ProductIframeModule'
  | 'ProductVideoModule'
  | 'SocialMediaModule'
  | 'SocialThumbsModule'
  | 'UnavailableModule'
  | 'VideoModule'
  | 'ViewTrackingModule';

interface ModulesType extends Record<ModuleNamesType, {}> {
  MenuModule: MenuContextType;
}

interface PropsType {
  user: contextUserFragmentType | null;
  children: React.ReactNode;
}

// definition
const defaultContext = {
  DividerModule: {},
  DraftTextModule: {},
  FacebookWallModule: {},
  GoogleMapModule: {},
  IframeModule: {},
  ImageModule: {},
  ImageTextModule: {},
  MenuModule: {
    user: null,
  },
  ProductDraftTextModule: {},
  ProductIframeModule: {},
  ProductVideoModule: {},
  SocialMediaModule: {},
  SocialThumbsModule: {},
  UnavailableModule: {},
  VideoModule: {},
  ViewTrackingModule: {},
};
const ModulesContext = React.createContext<ModulesType>(defaultContext);

export const contextUserFragment = gql`
  fragment contextUserFragment on User {
    id
    ...menuUserFragment
  }

  ${menuUserFragment}
`;

export const ModulesProvider = React.memo(({ user, children }: PropsType) => (
  <ModulesContext.Provider
    value={{
      ...defaultContext,
      MenuModule: {
        user: !user ? null : filter(menuUserFragment, user),
      },
    }}
  >
    {children}
  </ModulesContext.Provider>
));

export default ModulesContext;