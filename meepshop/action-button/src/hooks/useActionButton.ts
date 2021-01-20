// import
import { useQuery } from '@apollo/react-hooks';

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
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  getActionButtonSetting,
  getHomePageActionButtonSetting,
  getCustomPageActionButtonSetting,
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
      skip: pathname === '/' || pathname === '/pages',
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
    skip: pathname !== '/pages',
    variables: {
      path: query.path as string,
    },
  });

  return (
    homePageActionButtonSetting ||
    customPageActionButtonSetting ||
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
