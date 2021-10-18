import { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CookiesContext from '@meepshop/cookies';
import { useRouter } from '@meepshop/link';

import { adminPreview } from 'gqls/useAdminPreview';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import getJoinedModule from 'utils/getJoinedModule';

export default () => {
  const { cookies } = useContext(CookiesContext);
  const router = useRouter();
  const { data } = useQuery(adminPreview, {
    variables: {
      identity: cookies?.identity,
      input: { pageId: router.query.pageId },
      isProductPage: router.query.pId === 'preview',
    },
  });
  const store = data?.viewer?.store;
  const product = data?.defaultStoreProduct;
  const experimentPage = useMemo(() => {
    // TODO: for T9153
    if (store?.experiment?.isNewPageModulesEnabled) return null;

    const page = store?.page;

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
          widgets: getJoinedModule(
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
    experimentProduct: store?.experiment?.isNewPageModulesEnabled
      ? null
      : product,
    experimentPage,
  };
};
