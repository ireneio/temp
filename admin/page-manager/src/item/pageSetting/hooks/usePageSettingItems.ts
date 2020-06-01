// typescript import
import useSelectedPageType from '../../../hooks/useSelectedPage';

// import
import { useMemo } from 'react';
import gql from 'graphql-tag';

import useAssignDefaultHomePage from './useAssignDefaultHomePage';
import useAssignDefaultProductTemplatePage from './useAssignDefaultProductTemplatePage';
import useDuplicatePage from './useDuplicatePage';
import useDeletePage from './useDeletePage';

// graphql typescript
import { getPagesVariables } from '../../../__generated__/getPages';
import { usePageSettingItemsFragment as usePageSettingItemsFragmentType } from './__generated__/usePageSettingItemsFragment';

// definition
export const usePageSettingItemsFragment = gql`
  fragment usePageSettingItemsFragment on Page {
    id
    pageType
    isDefaultTemplatePage: isProductDefault
  }
`;

export default (
  { id, pageType, isDefaultTemplatePage }: usePageSettingItemsFragmentType,
  isHomePage: boolean,
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
          isHomePage ? null : 'home',
          'copy',
          isHomePage ? null : 'delete',
        ].filter(Boolean) as string[];

      case 'custom':
        return ['edit', 'copy', 'delete'];

      case 'products':
        return ['edit'];

      default:
        return [
          'edit',
          'copy',
          isDefaultTemplatePage ? null : 'template',
        ].filter(Boolean) as string[];
    }
  }, [pageType, isHomePage, isDefaultTemplatePage]);

  return {
    icons,
    events: {
      home: useAssignDefaultHomePage(id || 'id' /** TODO should not be null */),
      template: useAssignDefaultProductTemplatePage(
        id || 'id' /** TODO should not be null */,
      ),
      edit,
      copy: useDuplicatePage(
        id || 'id' /** TODO should not be null */,
        pageType,
        variables,
        setSelectedPage,
        isHomePage,
      ),
      delete: useDeletePage(
        id || 'id' /** TODO should not be null */,
        variables,
      ),
    },
  };
};
