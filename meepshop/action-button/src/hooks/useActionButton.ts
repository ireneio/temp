// import
import { useQuery } from '@apollo/client';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  getActionButtonSetting as getActionButtonSettingType,
  getHomePageActionButtonSetting as getHomePageActionButtonSettingType,
  getHomePageActionButtonSetting_viewer as getHomePageActionButtonSettingViewer,
  getHomePageActionButtonSetting_viewer_store as getHomePageActionButtonSettingViewerStore,
  getHomePageActionButtonSetting_viewer_store_page as getHomePageActionButtonSettingViewerStorePage,
  getCustomPageActionButtonSetting as getCustomPageActionButtonSettingType,
  getCustomPageActionButtonSettingVariables,
  getPageManagerPreviewActionButtonSetting as getPageManagerPreviewActionButtonSettingType,
  getPageManagerPreviewActionButtonSettingVariables,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  getActionButtonSetting,
  getHomePageActionButtonSetting,
  getCustomPageActionButtonSetting,
  getPageManagerPreviewActionButtonSetting,
} from '../gqls';

// typescript definition
interface ReturnType extends Omit<getActionButtonSettingType, 'viewer'> {
  viewer:
    | (Omit<getHomePageActionButtonSettingViewer, 'store'> & {
        store:
          | (Omit<getHomePageActionButtonSettingViewerStore, 'page'> & {
              page: getHomePageActionButtonSettingViewerStorePage | null;
            })
          | null;
      })
    | null;
}

// definition
export default (): ReturnType | null => {
  const { pathname, query } = useRouter();

  const { data } = useQuery<getActionButtonSettingType>(
    getActionButtonSetting,
    {
      skip:
        pathname === '/' ||
        pathname === '/pages/[path]' ||
        pathname === '/admin/[pageId]/[token]',
    },
  );

  const { data: homePageActionButtonSetting } = useQuery<
    getHomePageActionButtonSettingType
  >(getHomePageActionButtonSetting, {
    skip: pathname !== '/',
  });

  const { data: customPageActionButtonSetting } = useQuery<
    getCustomPageActionButtonSettingType,
    getCustomPageActionButtonSettingVariables
  >(getCustomPageActionButtonSetting, {
    skip: pathname !== '/pages/[path]',
    variables: {
      path: query.path as string,
    },
  });

  const { data: pageManagerPreviewActionButtonSetting } = useQuery<
    getPageManagerPreviewActionButtonSettingType,
    getPageManagerPreviewActionButtonSettingVariables
  >(getPageManagerPreviewActionButtonSetting, {
    skip: pathname !== '/admin/[pageId]/[token]',
    variables: {
      input: {
        pageId: query.pageId as string,
      },
    },
  });

  return (
    homePageActionButtonSetting ||
    customPageActionButtonSetting ||
    pageManagerPreviewActionButtonSetting ||
    (!data
      ? null
      : {
          ...data,
          viewer: !data.viewer
            ? null
            : {
                ...data.viewer,
                store: !data.viewer.store
                  ? null
                  : {
                      ...data.viewer.store,
                      page: null,
                    },
              },
        })
  );
};
