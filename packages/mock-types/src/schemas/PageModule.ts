// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

import GroupModule from './GroupModule';
import GoogleMapModule from './GoogleMapModule';

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

    ... on GoogleMapModule {
      id
      parentId
    }
  }
`;

const getPageModules = (
  getModule: typeof GoogleMapModule,
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
  () => getPageModules(GoogleMapModule),
]);
