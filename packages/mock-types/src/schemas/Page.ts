// import
import mock from '../mock';
import PageModule from './PageModule';

// graphql typescript
import { pageMockFragment } from './gqls/__generated__/pageMockFragment';

// definition
export default mock.add<
  pageMockFragment,
  {
    node?: {
      id: string;
    };
    defaultHomePage?: {
      id: string;
      title: {
        __typename: string;
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: string;
      } | null;
    };
    defaultProductListPage?: {
      id: string;
      title: {
        __typename: string;
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: string;
      } | null;
    };
  }
>('Page', [
  obj =>
    ({
      __typename: 'Page',
      id:
        obj.node?.id ||
        obj.defaultHomePage?.id ||
        obj.defaultProductListPage?.id ||
        'id',
      width: null,
      title: obj.defaultHomePage?.title ||
        obj.defaultProductListPage?.title || {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: obj.node?.id || 'id',
        },
      modules: PageModule({}, {}),
    } as pageMockFragment),
  obj =>
    ({
      __typename: 'Page',
      id: obj.node?.id ||
        obj.defaultHomePage?.id || {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: obj.defaultProductListPage?.id || 'id',
        },
      width: 940,
      title: obj.defaultHomePage?.title ||
        obj.defaultProductListPage?.title || {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: obj.node?.id || 'id',
        },
      modules: PageModule({}, {}),
    } as pageMockFragment),
  obj =>
    ({
      __typename: 'Page',
      id:
        obj.node?.id ||
        obj.defaultHomePage?.id ||
        obj.defaultProductListPage?.id ||
        'id',
      width: 1140,
      title: obj.defaultHomePage?.title ||
        obj.defaultProductListPage?.title || {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: obj.node?.id || 'id',
        },
      modules: PageModule({}, {}),
    } as pageMockFragment),
  obj =>
    ({
      __typename: 'Page',
      id:
        obj.node?.id ||
        obj.defaultHomePage?.id ||
        obj.defaultProductListPage?.id ||
        'id',
      width: 1440,
      title: obj.defaultHomePage?.title ||
        obj.defaultProductListPage?.title || {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: obj.node?.id || 'id',
        },
      modules: PageModule({}, {}),
    } as pageMockFragment),
]);
