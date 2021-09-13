import { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

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
  const { data } = useQuery(getPage, {
    variables: {
      identity: cookies?.identity,
      path: router.query.path || '',
      productId: router.query.pId || '',
      productSearch: {
        size: 1,
        from: 0,
        filter: {
          and: [
            {
              type: 'ids',
              ids: [router.query.pId || ''],
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
      isCustomPage: router.pathname === '/pages',
      isProductPage: router.pathname === '/product',
      isProductsPage: router.pathname === '/products',
    },
  });
  const store = data?.viewer?.store;
  const product = data?.computeProductList?.data?.[0];
  const experimentPage = useMemo(() => {
    if (!store?.experiment?.isNewPageModulesEnabled) return null;

    const page =
      store?.defaultHomePage ||
      store?.customPage ||
      store?.product?.page ||
      store?.defaultProductListPage;

    if (!page) return null;

    return {
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
          widgets: !store?.product
            ? modifyWidgetDataInClient(widgets, router.query, page)
            : getJoinedModule(
                modifyWidgetDataInClient(widgets, router.query, page),
                {
                  query: router.query,
                  product,
                },
              ),
        })),
    };
  }, [store, product, router.query]);

  return {
    i18n,
    router,
    storeName: store?.description?.name || '',
    storeDescription: store?.description?.introduction || '',
    logoImage: store?.logoImage,
    faviconImage: store?.faviconImage,
    experimentPage,
  };
};
