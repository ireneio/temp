// import
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// graphql import
import googleMapFragment from '@meepshop/google-map/lib/fragment';
import iframeFragment from '@meepshop/iframe/lib/fragment';
import dividerFragment from '@meepshop/divider/lib/fragment';

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

      ... on DividerModule {
        __typename
        id
        parentId
        ...dividerFragment
      }
    }
  }

  ${googleMapFragment}
  ${iframeFragment}
  ${dividerFragment}
`;

export default {
  GroupModule: () => {
    throw new Error('Can not use GroupModule');
  },
  LayoutModule: () => {
    throw new Error('Can not use LayoutModule');
  },
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  DividerModule: dynamic(() => import('@meepshop/divider')),
};
