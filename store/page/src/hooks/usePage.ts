// import
import { useQuery } from '@apollo/react-hooks';

import { useRouter } from '@meepshop/link';

// graphql typescript
import { usePageFragment } from '../gqls/__generated__/usePageFragment';
import {
  getHomePage as getHomePageType,
  getHomePageVariables,
  getHomePage_viewer as getHomePageViewer,
  getHomePage_viewer_store as getHomePageViewerStore,
  getHomePage_viewer_store_defaultHomePage as getHomePageViewerStoreDefaultHomePage,
} from '../gqls/__generated__/getHomePage';
import {
  getCustomPage as getCustomPageType,
  getCustomPageVariables,
} from '../gqls/__generated__/getCustomPage';
import {
  getProductPage as getProductPageType,
  getProductPageVariables,
} from '../gqls/__generated__/getProductPage';
import {
  getProductsPage as getProductsPageType,
  getProductsPageVariables,
} from '../gqls/__generated__/getProductsPage';

// graphql import
import {
  getHomePage,
  getCustomPage,
  getProductPage,
  getProductsPage,
} from '../gqls/usePage';

// typecript definition
interface DataType extends Omit<usePageFragment, 'viewer'> {
  viewer:
    | (Omit<getHomePageViewer, 'store'> & {
        store:
          | (Omit<getHomePageViewerStore, 'defaultHomePage'> & {
              page: getHomePageViewerStoreDefaultHomePage | null;
            })
          | null;
      })
    | null;
}

// definition
export default (): DataType | null => {
  const { pathname, query } = useRouter();
  const { data: homePageData } = useQuery<
    getHomePageType,
    getHomePageVariables
  >(getHomePage, {
    skip: pathname !== '/',
  });
  const { data: customPageData } = useQuery<
    getCustomPageType,
    getCustomPageVariables
  >(getCustomPage, {
    skip: pathname !== '/pages',
    variables: {
      path: query.path as string,
    },
  });
  const { data: productPageData } = useQuery<
    getProductPageType,
    getProductPageVariables
  >(getProductPage, {
    skip: pathname !== '/product',
    variables: {
      productId: query.pId as string,
    },
  });
  const { data: productsPageData } = useQuery<
    getProductsPageType,
    getProductsPageVariables
  >(getProductsPage, {
    skip: pathname !== '/products',
  });

  if (homePageData)
    return {
      ...homePageData,
      viewer: !homePageData.viewer
        ? null
        : {
            ...homePageData.viewer,
            store: !homePageData.viewer?.store
              ? null
              : {
                  ...homePageData.viewer.store,
                  page: homePageData.viewer.store?.defaultHomePage || null,
                },
          },
    };

  if (customPageData)
    return {
      ...customPageData,
      viewer: !customPageData.viewer
        ? null
        : {
            ...customPageData.viewer,
            store: !customPageData.viewer?.store
              ? null
              : {
                  ...customPageData.viewer.store,
                  page: customPageData.viewer.store?.customPage || null,
                },
          },
    };

  if (productPageData)
    return {
      ...productPageData,
      viewer: !productPageData.viewer
        ? null
        : {
            ...productPageData.viewer,
            store: !productPageData.viewer?.store
              ? null
              : {
                  ...productPageData.viewer.store,
                  page: productPageData.viewer.store?.product?.page || null,
                },
          },
    };

  if (productsPageData)
    return {
      ...productsPageData,
      viewer: !productsPageData.viewer
        ? null
        : {
            ...productsPageData.viewer,
            store: !productsPageData.viewer?.store
              ? null
              : {
                  ...productsPageData.viewer.store,
                  page:
                    productsPageData.viewer.store?.defaultProductListPage ||
                    null,
                },
          },
    };

  return null;
};
