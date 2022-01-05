// typescript import
import { HierarchyNode } from 'd3-hierarchy';

// import
import {
  ProductCarouselIcon,
  ProductInfoIcon,
  ProductCollectionsIcon,
  ProductDraftTextIcon,
  ProductVideoIcon,
  ProductQaIcon,
  ProductIframeIcon,
  ImageIcon,
  ImageTextIcon,
  CarouselIcon,
  DraftTextIcon,
  MenuIcon,
  ProductsIcon,
  ActivityIcon,
  LandingPageIcon,
  VideoIcon,
  GoogleMapIcon,
  IframeIcon,
  DividerIcon,
  GroupIcon,
  FacebookWallIcon,
  SocialThumbsIcon,
  SocialMediaIcon,
  ViewTrackingIcon,
  SmartConversionComponentIcon,
} from '@meepshop/icons';

// graphql typescript
import {
  editorFragment_modules as editorFragmentModulesType,
  PercentWidth,
  GroupModuleComponentWidth,
  JustifyContent,
} from '@meepshop/types/gqls/admin';

// typescript definition
export interface ModulesType {
  data?: editorFragmentModulesType;
  children?: HierarchyNode<editorFragmentModulesType>[];
  parentNode?: HierarchyNode<editorFragmentModulesType> | null;
}

export interface DragObjectType extends ModulesType {
  type: 'MODULE' | 'GROUP';
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  module?: keyof typeof DEFAULT_MODULE_DATA;
  level?: number;
}

// definition
export const DEFAULT_MODULE_DATA = {
  GroupModule: {
    __typename: 'GroupModule' as const,
    percentWidth: 'WIDTH100' as PercentWidth,
    componentWidth: 'WIDTH300' as GroupModuleComponentWidth,
    padding: null,
    releaseTime: null,
    background: null,
    backgroundImage: null,
  },
  DividerModule: {
    __typename: 'DividerModule' as const,
    width: 100,
    height: 50,
    justifyContent: 'CENTER' as JustifyContent,
    borderRadius: 0,
    background: '#cccccc',
  },
  ActivityModule: {},
  CarouselModule: {},
  DraftTextModule: {},
  FacebookWallModule: {},
  GoogleMapModule: {},
  IframeModule: {},
  ImageModule: {},
  ImageTextModule: {},
  LandingPageModule: {},
  MenuModule: {},
  ProductCarouselModule: {},
  ProductCollectionsModule: {},
  ProductDraftTextModule: {},
  ProductIframeModule: {},
  ProductInfoModule: {},
  ProductQaModule: {},
  ProductVideoModule: {},
  ProductsModule: {},
  SmartConversionModule: {},
  SocialMediaModule: {},
  SocialThumbsModule: {},
  VideoModule: {},
  ViewTrackingModule: {},
};

export const ModuleIcons = {
  GroupModule: GroupIcon,
  DividerModule: DividerIcon,
  ActivityModule: ActivityIcon,
  CarouselModule: CarouselIcon,
  DraftTextModule: DraftTextIcon,
  FacebookWallModule: FacebookWallIcon,
  GoogleMapModule: GoogleMapIcon,
  IframeModule: IframeIcon,
  ImageModule: ImageIcon,
  ImageTextModule: ImageTextIcon,
  LandingPageModule: LandingPageIcon,
  MenuModule: MenuIcon,
  ProductCarouselModule: ProductCarouselIcon,
  ProductCollectionsModule: ProductCollectionsIcon,
  ProductDraftTextModule: ProductDraftTextIcon,
  ProductIframeModule: ProductIframeIcon,
  ProductInfoModule: ProductInfoIcon,
  ProductQaModule: ProductQaIcon,
  ProductVideoModule: ProductVideoIcon,
  ProductsModule: ProductsIcon,
  SmartConversionModule: SmartConversionComponentIcon,
  SocialMediaModule: SocialMediaIcon,
  SocialThumbsModule: SocialThumbsIcon,
  VideoModule: VideoIcon,
  ViewTrackingModule: ViewTrackingIcon,
};
