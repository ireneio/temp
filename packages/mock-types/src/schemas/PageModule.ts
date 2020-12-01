// import
import uuid from 'uuid/v4';

import mock from '../mock';

import CarouselModule from './CarouselModule';
import DividerModule from './DividerModule';
import DraftTextModule from './DraftTextModule';
import FacebookWallModule from './FacebookWallModule';
import GoogleMapModule from './GoogleMapModule';
import GroupModule from './GroupModule';
import IframeModule from './IframeModule';
import ImageModule from './ImageModule';
import ImageTextModule from './ImageTextModule';
import LandingPageModule from './LandingPageModule';
import MenuModule from './MenuModule';
import ProductCarouselModule from './ProductCarouselModule';
import ProductCollectionsModule from './ProductCollectionsModule';
import ProductDraftTextModule from './ProductDraftTextModule';
import ProductIframeModule from './ProductIframeModule';
import ProductQaModule from './ProductQaModule';
import ProductVideoModule from './ProductVideoModule';
import SocialMediaModule from './SocialMediaModule';
import SocialThumbsModule from './SocialThumbsModule';
import UnavailableModule from './UnavailableModule';
import VideoModule from './VideoModule';
import ViewTrackingModule from './ViewTrackingModule';

// graphql typescript
import {
  pageModuleMockFragment,
  pageModuleMockFragment_LayoutModule as pageModuleMockFragmentLayoutModule,
} from './gqls/__generated__/pageModuleMockFragment';

// definition
const getPageModules = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getModule: any,
): pageModuleMockFragment[] => [
  {
    ...GroupModule({}, {}),
    id: 'group-id',
    parentId: 'root',
  },
  {
    __typename: 'LayoutModule',
    id: 'layout-id-1',
    parentId: 'group-id',
  } as pageModuleMockFragmentLayoutModule,
  {
    __typename: 'LayoutModule',
    id: 'layout-id-2',
    parentId: 'group-id',
  } as pageModuleMockFragmentLayoutModule,
  {
    __typename: 'LayoutModule',
    id: 'layout-id-3',
    parentId: 'layout-id-2',
  } as pageModuleMockFragmentLayoutModule,
  {
    __typename: 'LayoutModule',
    id: 'layout-id-4',
    parentId: 'layout-id-2',
  } as pageModuleMockFragmentLayoutModule,
  {
    ...getModule({}, {}),
    id: uuid(),
    parentId: 'layout-id-1',
  },
  {
    ...getModule({}, {}),
    id: uuid(),
    parentId: 'layout-id-3',
  },
  {
    ...getModule({}, {}),
    id: uuid(),
    parentId: 'layout-id-4',
  },
];

export default mock.add<pageModuleMockFragment[]>('PageModule', [
  () => getPageModules(CarouselModule),
  () => getPageModules(DividerModule),
  () => getPageModules(DraftTextModule),
  () => getPageModules(FacebookWallModule),
  () => getPageModules(GoogleMapModule),
  () => getPageModules(IframeModule),
  () => getPageModules(ImageModule),
  () => getPageModules(ImageTextModule),
  () => getPageModules(LandingPageModule),
  () => getPageModules(MenuModule),
  () => getPageModules(ProductCarouselModule),
  () => getPageModules(ProductCollectionsModule),
  () => getPageModules(ProductDraftTextModule),
  () => getPageModules(ProductIframeModule),
  () => getPageModules(ProductQaModule),
  () => getPageModules(ProductVideoModule),
  () => getPageModules(SocialMediaModule),
  () => getPageModules(SocialThumbsModule),
  () => getPageModules(UnavailableModule),
  () => getPageModules(VideoModule),
  () => getPageModules(ViewTrackingModule),
]);
