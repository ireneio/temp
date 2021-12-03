import { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import CookiesContext from '@meepshop/cookies';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import { getPage } from 'gqls/usePage';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import getJoinedModule from 'utils/getJoinedModule';

export default () => {
  const { cookies } = useContext(CookiesContext);
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const { data, client } = useQuery(getPage, {
    variables: {
      identity: cookies?.identity,
      path: router.query.path || '',
      productSearch: !router.query.pId
        ? undefined
        : {
            size: 1,
            from: 0,
            filter: {
              and: [
                {
                  type: 'ids',
                  ids: [router.query.pId],
                },
              ],
            },
            sort: [
              {
                field: 'createdAt',
                order: 'desc',
              },
            ],
            showVariants: true,
            showMainFile: true,
          },
      isHomePage: router.pathname === '/',
      isCustomPage: router.pathname === '/pages/[path]',
      isProductPage: ['/products/[pId]', '/product/[pId]'].includes(
        router.pathname,
      ),
      isProductsPage: router.pathname === '/products',
    },
  });
  const store = data?.viewer?.store || null;
  const product = data?.computeProductList?.data?.[0] || null;

  return {
    i18n,
    router,
    client,
    storeName: store?.description?.name || '',
    storeDescription: store?.description?.introduction || '',
    logoImage: store?.logoImage,
    faviconImage: store?.faviconImage,
    product,
    page: useMemo(() => {
      const page =
        store?.defaultHomePage ||
        store?.customPage ||
        product?.page ||
        store?.defaultProductListPage;

      return !page
        ? null
        : {
            ...page,
            blocks: (page.blocks || [])
              .filter(
                ({ releaseDateTime }) =>
                  !releaseDateTime ||
                  parseInt(releaseDateTime, 10) * 1000 <= new Date().getTime(),
              )
              .map(({ width, componentWidth, widgets, ...block }) => ({
                ...block,
                width: width || 100,
                componentWidth: componentWidth || 0,
                widgets: getJoinedModule(
                  modifyWidgetDataInClient(widgets, router.query, page),
                  {
                    query: router.query,
                    product,
                  },
                ),
              })),
          };
    }, [store, product, router.query]),
  };
};
