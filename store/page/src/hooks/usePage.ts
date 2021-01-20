// import
import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CookiesContext from '@meepshop/cookies';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  usePageFragment,
  getHomePage as getHomePageType,
  getHomePageVariables,
  getHomePage_viewer as getHomePageViewer,
  getHomePage_viewer_store as getHomePageViewerStore,
  getHomePage_viewer_store_defaultHomePage as getHomePageViewerStoreDefaultHomePage,
  getCustomPage as getCustomPageType,
  getCustomPageVariables,
  getProductPage as getProductPageType,
  getProductPageVariables,
  getProductsPage as getProductsPageType,
  getProductsPageVariables,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  getHomePage,
  getCustomPage,
  getProductPage,
  getProductsPage,
} from '../gqls/usePage';

// typescript definition
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
  const { cookies } = useContext(CookiesContext);
  const { pathname, query } = useRouter();
  const { data: homePageData, error: homePageError } = useQuery<
    getHomePageType,
    getHomePageVariables
  >(getHomePage, {
    skip: pathname !== '/',
    variables: {
      identity: cookies.identity,
    },
  });
  const { data: customPageData, error: customPageError } = useQuery<
    getCustomPageType,
    getCustomPageVariables
  >(getCustomPage, {
    skip: pathname !== '/pages',
    variables: {
      identity: cookies.identity,
      path: query.path as string,
    },
  });
  const { data: productPageData, error: productPageError } = useQuery<
    getProductPageType,
    getProductPageVariables
  >(getProductPage, {
    skip: pathname !== '/product',
    variables: {
      identity: cookies.identity,
      productId: query.pId as string,
    },
  });
  const { data: productsPageData, error: productsPageError } = useQuery<
    getProductsPageType,
    getProductsPageVariables
  >(getProductsPage, {
    skip: pathname !== '/products',
    variables: {
      identity: cookies.identity,
    },
  });

  const error =
    homePageError || customPageError || productPageError || productsPageError;

  // FIXME: only use for old modules
  if (error) throw error;

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
