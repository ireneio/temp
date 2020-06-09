// import
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// graphql import
import dividerFragment from '@meepshop/divider/lib/fragment';
import draftTextFragment from '@meepshop/draft-text/lib/fragment';
import googleMapFragment from '@meepshop/google-map/lib/fragment';
import iframeFragment from '@meepshop/iframe/lib/fragment';
import productVideoFragment from '@meepshop/product-video/lib/fragment';
import unavailableFragment from '@meepshop/unavailable/lib/fragment';
import videoFragment from '@meepshop/video/lib/fragment';

// definition
export const modulesFragment = gql`
  fragment modulesFragment on Page {
    id
    modules {
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

      ... on ProductVideoModule {
        __typename
        id
        parentId
        ...productVideoFragment
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
    }
  }

  ${dividerFragment}
  ${draftTextFragment}
  ${googleMapFragment}
  ${iframeFragment}
  ${productVideoFragment}
  ${unavailableFragment}
  ${videoFragment}
`;

export default {
  GroupModule: () => {
    throw new Error('Can not use GroupModule');
  },
  LayoutModule: () => {
    throw new Error('Can not use LayoutModule');
  },
  DividerModule: dynamic(() => import('@meepshop/divider')),
  DraftTextModule: dynamic(() => import('@meepshop/draft-text')),
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  ProductVideoModule: dynamic(() => import('@meepshop/product-video')),
  UnavailableModule: dynamic(() => import('@meepshop/unavailable')),
  VideoModule: dynamic(() => import('@meepshop/video')),
};
