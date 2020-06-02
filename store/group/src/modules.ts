// import
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// graphql import
import dividerFragment from '@meepshop/divider/lib/fragment';
import googleMapFragment from '@meepshop/google-map/lib/fragment';
import iframeFragment from '@meepshop/iframe/lib/fragment';
import unavailableFragment from '@meepshop/unavailable/lib/fragment';

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

      ... on UnavailableModule {
        __typename
        id
        parentId
        ...unavailableFragment
      }
    }
  }

  ${dividerFragment}
  ${googleMapFragment}
  ${iframeFragment}
  ${unavailableFragment}
`;

export default {
  GroupModule: () => {
    throw new Error('Can not use GroupModule');
  },
  LayoutModule: () => {
    throw new Error('Can not use LayoutModule');
  },
  DividerModule: dynamic(() => import('@meepshop/divider')),
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  UnavailableModule: dynamic(() => import('@meepshop/unavailable')),
};
