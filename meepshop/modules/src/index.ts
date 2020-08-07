// import
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// graphql import
import dividerFragment from '@meepshop/divider/lib/fragment';
import draftTextFragment from '@meepshop/draft-text/lib/fragment';
import facebookWallFragment from '@meepshop/facebook-wall/lib/fragment';
import googleMapFragment from '@meepshop/google-map/lib/fragment';
import iframeFragment from '@meepshop/iframe/lib/fragment';
import imageFragment from '@meepshop/image/lib/fragment';
import menuFragment from '@meepshop/menu/lib/fragment';
import productDraftTextFragment from '@meepshop/product-draft-text/lib/fragment';
import productIframeFragment from '@meepshop/product-iframe/lib/fragment';
import productVideoFragment from '@meepshop/product-video/lib/fragment';
import socialMediaFragment from '@meepshop/social-media/lib/fragment';
import socialThumbsFragment from '@meepshop/social-thumbs/lib/fragment';
import unavailableFragment from '@meepshop/unavailable/lib/fragment';
import videoFragment from '@meepshop/video/lib/fragment';
import viewTrackingFragment from '@meepshop/view-tracking/lib/fragment';

// definition
export {
  contextUserFragment,
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

    ... on MenuModule {
      __typename
      id
      parentId
      ...menuFragment
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

  ${dividerFragment}
  ${draftTextFragment}
  ${facebookWallFragment}
  ${googleMapFragment}
  ${iframeFragment}
  ${imageFragment}
  ${menuFragment}
  ${productDraftTextFragment}
  ${productIframeFragment}
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
  DividerModule: dynamic(() => import('@meepshop/divider')),
  DraftTextModule: dynamic(() => import('@meepshop/draft-text')),
  FacebookWallModule: dynamic(() => import('@meepshop/facebook-wall')),
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  ImageModule: dynamic(() => import('@meepshop/image')),
  MenuModule: dynamic(() => import('@meepshop/menu')),
  ProductDraftTextModule: dynamic(() => import('@meepshop/product-draft-text')),
  ProductIframeModule: dynamic(() => import('@meepshop/product-iframe')),
  ProductVideoModule: dynamic(() => import('@meepshop/product-video')),
  SocialMediaModule: dynamic(() => import('@meepshop/social-media')),
  SocialThumbsModule: dynamic(() => import('@meepshop/social-thumbs')),
  UnavailableModule: dynamic(() => import('@meepshop/unavailable')),
  VideoModule: dynamic(() => import('@meepshop/video')),
  ViewTrackingModule: dynamic(() => import('@meepshop/view-tracking')),
};

export default modules;
