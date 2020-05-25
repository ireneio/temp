// import
import gql from 'graphql-tag';

import mock from '../mock';

import getLocale from './utils/getLocale';

import PageModule from './PageModule';

// graphql typescript
import { PageMock } from './__generated__/PageMock';

import { localeFragment as localeFragmentType } from './fragments/__generated__/localeFragment';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment PageMock on Page {
    id
    width
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export default mock.add<
  PageMock,
  {
    node?: {
      id: string;
    };
    defaultHomePage?: {
      id: string;
      title: localeFragmentType;
    };
    defaultProductListPage?: {
      id: string;
      title: localeFragmentType;
    };
  }
>('Page', [
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: null,
    title:
      obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title ||
      getLocale(obj.node?.id || 'id'),
    modules: PageModule({}, {}),
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 940,
    title:
      obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title ||
      getLocale(obj.node?.id || 'id'),
    modules: PageModule({}, {}),
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 1140,
    title:
      obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title ||
      getLocale(obj.node?.id || 'id'),
    modules: PageModule({}, {}),
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 1440,
    title:
      obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title ||
      getLocale(obj.node?.id || 'id'),
    modules: PageModule({}, {}),
  }),
]);
