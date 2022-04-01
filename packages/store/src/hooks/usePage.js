import { useMemo, useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';

import { useApolloNetworkStatus } from '@meepshop/apollo';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { useCart } from '@meepshop/hooks';
import filter from '@meepshop/utils/lib/filter';

import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { getPage } from 'gqls/usePage';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import getJoinedModule from 'utils/getJoinedModule';

import useInitializeGuestCart from './useInitializeGuestCart';

export default () => {
  const { numPendingQueries } = useApolloNetworkStatus();
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const [mergingCart, setMergingCart] = useState(false);
  const { data: originalData, loading, client } = useQuery(getPage, {
    variables: {
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
  const prevData = useRef(originalData);
  const data = loading && prevData.current ? prevData.current : originalData;
  const { cartItems, upsertCart } = useCart(
    filter(useCartFragment, data?.viewer || null),
  );
  const store = data?.viewer?.store || null;
  const product = data?.computeProductList?.data?.[0] || null;

  if (originalData) prevData.current = originalData;

  // FIXME: should simpify
  useInitializeGuestCart(data?.viewer?.id || null);
  useEffect(() => {
    if (
      !mergingCart &&
      data?.viewer?.role === 'SHOPPER' &&
      numPendingQueries === 0 &&
      (data?.viewer.guestCart.cartItems || []).length !== 0
    ) {
      setMergingCart(true);

      (async () => {
        await upsertCart(cartItems);
        setMergingCart(false);
      })();
    }
  }, [data, cartItems, mergingCart, upsertCart, numPendingQueries]);

  return {
    i18n,
    router,
    client,
    storeName: store?.description?.name || '',
    storeDescription: store?.description?.introduction || '',
    logoImage: store?.logoImage,
    faviconImage: store?.faviconImage,
    backToTopButtonEnabled: store?.setting?.backToTopButtonEnabled || false,
    product,
    loading,
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
