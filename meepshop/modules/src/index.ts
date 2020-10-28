// import
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// graphql import
import carouselFragment from '@meepshop/carousel/lib/gqls';
import dividerFragment from '@meepshop/divider/lib/gqls';
import draftTextFragment from '@meepshop/draft-text/lib/gqls';
import facebookWallFragment from '@meepshop/facebook-wall/lib/gqls';
import googleMapFragment from '@meepshop/google-map/lib/gqls';
import iframeFragment from '@meepshop/iframe/lib/gqls';
import imageFragment from '@meepshop/image/lib/gqls';
import imageTextFragment from '@meepshop/image-text/lib/gqls';
import { menuMenuModuleFragment } from '@meepshop/menu/lib/gqls';
import productCarouselFragment from '@meepshop/product-carousel/lib/gqls';
import productCollectionsFragment from '@meepshop/product-collections/lib/gqls';
import productDraftTextFragment from '@meepshop/product-draft-text/lib/fragment';
import productIframeFragment from '@meepshop/product-iframe/lib/fragment';
import { productQaProductQaModuleFragment } from '@meepshop/product-qa/lib/gqls';
import productVideoFragment from '@meepshop/product-video/lib/fragment';
import smartConversionFragment from '@meepshop/smart-conversion/lib/gqls';
import socialMediaFragment from '@meepshop/social-media/lib/fragment';
import socialThumbsFragment from '@meepshop/social-thumbs/lib/fragment';
import unavailableFragment from '@meepshop/unavailable/lib/fragment';
import videoFragment from '@meepshop/video/lib/fragment';
import viewTrackingFragment from '@meepshop/view-tracking/lib/fragment';

// definition
export {
  contextUserFragment,
  contextOrderFragment,
  ModulesProvider,
  default as ModulesContext,
} from './context';

export const modulesFragment = gql`
  fragment modulesFragment on PageModule {
    ... on GroupModule {
      __typename
      id
      parentId
      percentWidth
      componentWidth
      padding
      background
      backgroundImage {
        image {
          id
          scaledSrc {
            w1920
          }
        }
        cover
        repeat
      }
    }

    ... on LayoutModule {
      __typename
      id
      parentId
    }

    ... on ActivityModule {
      __typename
      id
      parentId
    }

    ... on CarouselModule {
      __typename
      id
      parentId
      ...carouselFragment
    }

    ... on DividerModule {
      __typename
      id
      parentId
      ...dividerFragment
    }

    ... on DraftTextModule {
      __typename
      id
      parentId
      ...draftTextFragment
    }

    ... on FacebookWallModule {
      __typename
      id
      parentId
      ...facebookWallFragment
    }

    ... on GoogleMapModule {
      __typename
      id
      parentId
      ...googleMapFragment
    }

    ... on IframeModule {
      __typename
      id
      parentId
      ...iframeFragment
    }

    ... on ImageModule {
      __typename
      id
      parentId
      ...imageFragment
    }

    ... on ImageTextModule {
      __typename
      id
      parentId
      ...imageTextFragment
    }

    ... on LandingPageModule {
      __typename
      id
      parentId
    }

    ... on MenuModule {
      __typename
      id
      parentId
      ...menuMenuModuleFragment
    }

    ... on ProductCarouselModule {
      __typename
      id
      parentId
      ...productCarouselFragment
    }

    ... on ProductCollectionsModule {
      __typename
      id
      parentId
      ...productCollectionsFragment
    }

    ... on ProductDraftTextModule {
      __typename
      id
      parentId
      ...productDraftTextFragment
    }

    ... on ProductIframeModule {
      __typename
      id
      parentId
      ...productIframeFragment
    }

    ... on ProductInfoModule {
      __typename
      id
      parentId
    }

    ... on ProductQaModule {
      __typename
      id
      parentId
      ...productQaProductQaModuleFragment
    }

    ... on ProductVideoModule {
      __typename
      id
      parentId
      ...productVideoFragment
    }

    ... on ProductsModule {
      __typename
      id
      parentId
    }

    ... on SmartConversionModule {
      __typename
      id
      parentId
      ...smartConversionFragment
    }

    ... on SocialMediaModule {
      __typename
      id
      parentId
      ...socialMediaFragment
    }

    ... on SocialThumbsModule {
      __typename
      id
      parentId
      ...socialThumbsFragment
    }

    ... on UnavailableModule {
      __typename
      id
      parentId
      ...unavailableFragment
    }

    ... on VideoModule {
      __typename
      id
      parentId
      ...videoFragment
    }

    ... on ViewTrackingModule {
      __typename
      id
      parentId
      ...viewTrackingFragment
    }
  }

  ${carouselFragment}
  ${dividerFragment}
  ${draftTextFragment}
  ${facebookWallFragment}
  ${googleMapFragment}
  ${iframeFragment}
  ${imageFragment}
  ${imageTextFragment}
  ${menuMenuModuleFragment}
  ${productCarouselFragment}
  ${productCollectionsFragment}
  ${productDraftTextFragment}
  ${productIframeFragment}
  ${productQaProductQaModuleFragment}
  ${productVideoFragment}
  ${smartConversionFragment}
  ${socialMediaFragment}
  ${socialThumbsFragment}
  ${unavailableFragment}
  ${videoFragment}
  ${viewTrackingFragment}
`;

export default {
  GroupModule: () => {
    throw new Error('Can not use GroupModule');
  },
  LayoutModule: () => {
    throw new Error('Can not use LayoutModule');
  },
  ActivityModule: () => {
    throw new Error('Can not use ActivityModule');
  },
  CarouselModule: dynamic(() => import('@meepshop/carousel')),
  DividerModule: dynamic(() => import('@meepshop/divider')),
  DraftTextModule: dynamic(() => import('@meepshop/draft-text')),
  FacebookWallModule: dynamic(() => import('@meepshop/facebook-wall')),
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  ImageModule: dynamic(() => import('@meepshop/image')),
  ImageTextModule: dynamic(() => import('@meepshop/image-text')),
  LandingPageModule: () => {
    throw new Error('Can not use LandingPageModule');
  },
  MenuModule: dynamic(() => import('@meepshop/menu')),
  ProductCarouselModule: dynamic(() => import('@meepshop/product-carousel')),
  ProductCollectionsModule: dynamic(() =>
    import('@meepshop/product-collections'),
  ),
  ProductDraftTextModule: dynamic(() => import('@meepshop/product-draft-text')),
  ProductIframeModule: dynamic(() => import('@meepshop/product-iframe')),
  ProductInfoModule: () => {
    throw new Error('Can not use ProductInfoModule');
  },
  ProductQaModule: dynamic(() => import('@meepshop/product-qa')),
  ProductVideoModule: dynamic(() => import('@meepshop/product-video')),
  ProductsModule: () => {
    throw new Error('Can not use ProductsModule');
  },
  SmartConversionModule: dynamic(() => import('@meepshop/smart-conversion')),
  SocialMediaModule: dynamic(() => import('@meepshop/social-media')),
  SocialThumbsModule: dynamic(() => import('@meepshop/social-thumbs')),
  UnavailableModule: dynamic(() => import('@meepshop/unavailable')),
  VideoModule: dynamic(() => import('@meepshop/video')),
  ViewTrackingModule: dynamic(() => import('@meepshop/view-tracking')),
};
