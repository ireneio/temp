// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

import DividerModule from './DividerModule';
import DraftTextModule from './DraftTextModule';
import FacebookWallModule from './FacebookWallModule';
import GoogleMapModule from './GoogleMapModule';
import GroupModule from './GroupModule';
import IframeModule from './IframeModule';
import ProductDraftTextModule from './ProductDraftTextModule';
import ProductVideoModule from './ProductVideoModule';
import SocialThumbsModule from './SocialThumbsModule';
import UnavailableModule from './UnavailableModule';
import VideoModule from './VideoModule';

// graphql typescript
import {
  PageModuleMock,
  PageModuleMock_LayoutModule as PageModuleMockLayoutModule,
} from './__generated__/PageModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment PageModuleMock on PageModule {
    ... on GroupModule {
      id
      parentId
    }

    ... on LayoutModule {
      id
      parentId
    }

    ... on DividerModule {
      id
      parentId
    }

    ... on FacebookWallModule {
      id
      parentId
    }

    ... on DraftTextModule {
      id
      parentId
    }

    ... on GoogleMapModule {
      id
      parentId
    }

    ... on IframeModule {
      id
      parentId
    }

    ... on ProductDraftTextModule {
      id
      parentId
    }

    ... on ProductVideoModule {
      id
      parentId
    }

    ... on SocialThumbsModule {
      id
      parentId
    }

    ... on UnavailableModule {
      id
      parentId
    }

    ... on VideoModule {
      id
      parentId
    }
  }
`;

const getPageModules = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getModule: any,
): PageModuleMock[] => [
  {
    ...GroupModule({}, {}),
    id: 'group-id',
    parentId: 'root',
  },
  {
    __typename: 'LayoutModule',
    id: 'layout-id-1',
    parentId: 'group-id',
  } as PageModuleMockLayoutModule,
  {
    __typename: 'LayoutModule',
    id: 'layout-id-2',
    parentId: 'group-id',
  } as PageModuleMockLayoutModule,
  {
    __typename: 'LayoutModule',
    id: 'layout-id-3',
    parentId: 'layout-id-2',
  } as PageModuleMockLayoutModule,
  {
    __typename: 'LayoutModule',
    id: 'layout-id-4',
    parentId: 'layout-id-2',
  } as PageModuleMockLayoutModule,
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

export default mock.add<PageModuleMock[]>('PageModule', [
  () => getPageModules(DividerModule),
  () => getPageModules(DraftTextModule),
  () => getPageModules(FacebookWallModule),
  () => getPageModules(GoogleMapModule),
  () => getPageModules(IframeModule),
  () => getPageModules(ProductDraftTextModule),
  () => getPageModules(ProductVideoModule),
  () => getPageModules(SocialThumbsModule),
  () => getPageModules(UnavailableModule),
  () => getPageModules(VideoModule),
]);
