// import
import mock from '../mock';
import PageModule from './PageModule';

// graphql typescript
import { pageMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
const defaultTitle = {
  __typename: 'Locale',
  /* eslint-disable @typescript-eslint/camelcase */
  zh_TW: null,
  en_US: null,
  ja_JP: null,
  vi_VN: null,
  fr_FR: null,
  es_ES: null,
  th_TH: null,
  id_ID: null,
  /* eslint-enable @typescript-eslint/camelcase */
} as const;

export default mock.add<
  pageMockFragment,
  {
    node?: {
      id: string;
    };
    defaultHomePage?: {
      id: string;
      title: typeof defaultTitle | null;
    };
    defaultProductListPage?: {
      id: string;
      title: typeof defaultTitle | null;
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
    title: obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title || {
        ...defaultTitle,
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: obj.node?.id || 'id',
      },
    modules: PageModule({}, {}),
    useBottom: false,
    container: 'DefaultContainer',
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 940,
    title: obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title || {
        __typename: 'Locale',
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: obj.node?.id || 'id',
      },
    modules: PageModule({}, {}),
    useBottom: true,
    container: 'FixedTopContainer',
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 1140,
    title: obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title || {
        ...defaultTitle,
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: obj.node?.id || 'id',
      },
    modules: PageModule({}, {}),
    useBottom: true,
    container: 'Sidebar',
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 1440,
    title: obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title || {
        ...defaultTitle,
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: obj.node?.id || 'id',
      },
    modules: PageModule({}, {}),
    useBottom: true,
    container: 'TwoTopsContainer',
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 1440,
    title: obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title || {
        ...defaultTitle,
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: obj.node?.id || 'id',
      },
    modules: PageModule({}, {}),
    useBottom: true,
    container: 'FixedTopContainerWithSidebar',
  }),
  obj => ({
    __typename: 'Page',
    id:
      obj.node?.id ||
      obj.defaultHomePage?.id ||
      obj.defaultProductListPage?.id ||
      'id',
    width: 1440,
    title: obj.defaultHomePage?.title ||
      obj.defaultProductListPage?.title || {
        ...defaultTitle,
        // eslint-disable-next-line @typescript-eslint/camelcase
        zh_TW: obj.node?.id || 'id',
      },
    modules: PageModule({}, {}),
    useBottom: true,
    container: 'TwoTopsContainerWithSidebar',
  }),
]);
