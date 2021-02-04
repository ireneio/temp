// typescript import
import useSelectedPageType from '../../../hooks/useSelectedPage';

// import
import { useMemo } from 'react';

import useAssignDefaultHomePage from './useAssignDefaultHomePage';
import useAssignDefaultProductTemplatePage from './useAssignDefaultProductTemplatePage';
import useDuplicatePage from './useDuplicatePage';
import useDeletePage from './useDeletePage';

// graphql typescript
import {
  getPagesVariables,
  usePageSettingItemsPageFragment as usePageSettingItemsPageFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  {
    id,
    pageType,
    isDefaultHomePage,
    isDefaultProductTemplatePage,
  }: usePageSettingItemsPageFragmentType,
  edit: () => void,
  variables: getPagesVariables,
  setSelectedPage: ReturnType<typeof useSelectedPageType>['setSelectedPage'],
): {
  icons: string[];
  events: {
    [key: string]: () => void;
  };
} => {
  const icons = useMemo(() => {
    switch (pageType) {
      case 'home':
        return [
          'edit',
          isDefaultHomePage ? null : 'home',
          'copy',
          isDefaultHomePage ? null : 'delete',
        ].filter(Boolean) as string[];

      case 'custom':
        return ['edit', 'copy', 'delete'];

      case 'products':
        return ['edit'];

      default:
        return [
          'edit',
          'copy',
          isDefaultProductTemplatePage ? null : 'template',
        ].filter(Boolean) as string[];
    }
  }, [pageType, isDefaultHomePage, isDefaultProductTemplatePage]);

  return {
    icons,
    events: {
      home: useAssignDefaultHomePage(id || 'id' /** SHOULD_NOT_BE_NULL */),
      template: useAssignDefaultProductTemplatePage(
        id || 'id' /** SHOULD_NOT_BE_NULL */,
      ),
      edit,
      copy: useDuplicatePage(
        id || 'id' /** SHOULD_NOT_BE_NULL */,
        pageType,
        variables,
        setSelectedPage,
      ),
      delete: useDeletePage(id || 'id' /** SHOULD_NOT_BE_NULL */, variables),
    },
  };
};
