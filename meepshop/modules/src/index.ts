// import
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// graphql import
import carouselFragment from '@meepshop/carousel/lib/fragments';
import dividerFragment from '@meepshop/divider/lib/fragments';
import draftTextFragment from '@meepshop/draft-text/lib/fragments';
import facebookWallFragment from '@meepshop/facebook-wall/lib/fragments';
import googleMapFragment from '@meepshop/google-map/lib/fragments';
import iframeFragment from '@meepshop/iframe/lib/fragments';
import imageFragment from '@meepshop/image/lib/fragments';
import imageTextFragment from '@meepshop/image-text/lib/fragments';
import menuFragment from '@meepshop/menu/lib/fragments';
import productCarouselFragment from '@meepshop/product-carousel/lib/fragment';
import productCollectionsFragment from '@meepshop/product-collections/lib/fragment';
import productDraftTextFragment from '@meepshop/product-draft-text/lib/fragment';
import productIframeFragment from '@meepshop/product-iframe/lib/fragment';
import productQaFragment from '@meepshop/product-qa/lib/fragment';
import productVideoFragment from '@meepshop/product-video/lib/fragment';
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

    ... on MenuModule {
      __typename
      id
      parentId
      ...menuFragment
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

    ... on ProductQaModule {
      __typename
      id
      parentId
      ...productQaFragment
    }

    ... on ProductVideoModule {
      __typename
      id
      parentId
      ...productVideoFragment
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
  ${menuFragment}
  ${productCarouselFragment}
  ${productCollectionsFragment}
  ${productDraftTextFragment}
  ${productIframeFragment}
  ${productQaFragment}
  ${productVideoFragment}
  ${socialMediaFragment}
  ${socialThumbsFragment}
  ${unavailableFragment}
  ${videoFragment}
  ${viewTrackingFragment}
`;

const modules = {
  GroupModule: () => {
    throw new Error('Can not use GroupModule');
  },
  LayoutModule: () => {
    throw new Error('Can not use LayoutModule');
  },
  CarouselModule: dynamic(() => import('@meepshop/carousel')),
  DividerModule: dynamic(() => import('@meepshop/divider')),
  DraftTextModule: dynamic(() => import('@meepshop/draft-text')),
  FacebookWallModule: dynamic(() => import('@meepshop/facebook-wall')),
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  ImageModule: dynamic(() => import('@meepshop/image')),
  ImageTextModule: dynamic(() => import('@meepshop/image-text')),
  MenuModule: dynamic(() => import('@meepshop/menu')),
  ProductCarouselModule: dynamic(() => import('@meepshop/product-carousel')),
  ProductCollectionsModule: dynamic(() =>
    import('@meepshop/product-collections'),
  ),
  ProductDraftTextModule: dynamic(() => import('@meepshop/product-draft-text')),
  ProductIframeModule: dynamic(() => import('@meepshop/product-iframe')),
  ProductQaModule: dynamic(() => import('@meepshop/product-qa')),
  ProductVideoModule: dynamic(() => import('@meepshop/product-video')),
  SocialMediaModule: dynamic(() => import('@meepshop/social-media')),
  SocialThumbsModule: dynamic(() => import('@meepshop/social-thumbs')),
  UnavailableModule: dynamic(() => import('@meepshop/unavailable')),
  VideoModule: dynamic(() => import('@meepshop/video')),
  ViewTrackingModule: dynamic(() => import('@meepshop/view-tracking')),
};

export default modules;
