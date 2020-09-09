// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

// graphql typescript
import { ContextType as MenuContextType } from '@meepshop/menu/lib/fragment';
import { ContextType as ProductQaContextType } from '@meepshop/product-qa/lib/fragment';

import { contextUserFragment as contextUserFragmentType } from './__generated__/contextUserFragment';

// graphql import
import { menuUserFragment } from '@meepshop/menu/lib/fragment';
import { productQaUserFragment } from '@meepshop/product-qa/lib/fragment';

// typescript definition
type ModuleNamesType =
  | 'CarouselModule'
  | 'DividerModule'
  | 'DraftTextModule'
  | 'FacebookWallModule'
  | 'GoogleMapModule'
  | 'IframeModule'
  | 'ImageModule'
  | 'ImageTextModule'
  | 'ProductCarouselModule'
  | 'ProductCollectionsModule'
  | 'ProductDraftTextModule'
  | 'ProductIframeModule'
  | 'ProductQaModule'
  | 'ProductVideoModule'
  | 'SocialMediaModule'
  | 'SocialThumbsModule'
  | 'UnavailableModule'
  | 'VideoModule'
  | 'ViewTrackingModule';

interface ModulesType extends Record<ModuleNamesType, {}> {
  MenuModule: MenuContextType;
  ProductQaModule: ProductQaContextType;
}

interface PropsType {
  user: contextUserFragmentType | null;
  children: React.ReactNode;
}

// definition
const defaultContext = {
  CarouselModule: {},
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
  ProductCarouselModule: {},
  ProductCollectionsModule: {},
  ProductDraftTextModule: {},
  ProductIframeModule: {},
  ProductQaModule: {
    user: null,
  },
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
    ...productQaUserFragment
  }

  ${menuUserFragment}
  ${productQaUserFragment}
`;

export const ModulesProvider = React.memo(({ user, children }: PropsType) => (
  <ModulesContext.Provider
    value={{
      ...defaultContext,
      MenuModule: {
        user: !user ? null : filter(menuUserFragment, user),
      },
      ProductQaModule: {
        user: !user ? null : filter(productQaUserFragment, user),
      },
    }}
  >
    {children}
  </ModulesContext.Provider>
));

export default ModulesContext;
