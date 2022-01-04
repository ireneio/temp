import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { useRouter } from '@meepshop/link';

import { adminPreview } from 'gqls/useAdminPreview';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import getJoinedModule from 'utils/getJoinedModule';

export default () => {
  const router = useRouter();
  const { data } = useQuery(adminPreview, {
    variables: {
      input: { pageId: router.query.pageId },
      isProductPage: router.query.pId === 'preview',
    },
  });

  const store = data?.viewer?.store || null;
  const product = data?.defaultStoreProduct || null;

  return {
    product,
    page: useMemo(() => {
      const page = store?.page;

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
