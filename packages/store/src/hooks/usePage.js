import { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CookiesContext from '@meepshop/cookies';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import { getPage } from 'gqls/usePage';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';

export default () => {
  const { cookies } = useContext(CookiesContext);
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const { data } = useQuery(getPage, {
    variables: {
      identity: cookies?.identity,
      isHomePage: router.pathname === '/',
    },
  });
  const store = data?.viewer?.store;
  const experimentPage = useMemo(() => {
    if (!store?.isNewPageModulesEnabled) return null;

    const page = store?.defaultHomePage;

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
          widgets: modifyWidgetDataInClient(widgets, router.query, page),
        })),
    };
  }, [store, router.query]);

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
