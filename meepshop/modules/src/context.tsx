// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

// graphql typescript
import { ContextType as MenuContextType } from '@meepshop/menu/lib/gqls';
import { ContextType as ProductQaContextType } from '@meepshop/product-qa/lib/fragment';

import { contextUserFragment as contextUserFragmentType } from './__generated__/contextUserFragment';
import { contextOrderFragment as contextOrderFragmentType } from './__generated__/contextOrderFragment';

// graphql import
import { menuUserFragment, menuOrderFragment } from '@meepshop/menu/lib/gqls';
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
  order: contextOrderFragmentType | null;
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
    order: null,
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

export const contextOrderFragment = gql`
  fragment contextOrderFragment on Order {
    id
    ...menuOrderFragment
  }

  ${menuOrderFragment}
`;

export const ModulesProvider = React.memo(
  ({ user, order, children }: PropsType) => (
    <ModulesContext.Provider
      value={{
        ...defaultContext,
        MenuModule: {
          user: !user ? null : filter(menuUserFragment, user),
          order: !order ? null : filter(menuOrderFragment, order),
        },
        ProductQaModule: {
          user: !user ? null : filter(productQaUserFragment, user),
        },
      }}
    >
      {children}
    </ModulesContext.Provider>
  ),
);

export default ModulesContext;
