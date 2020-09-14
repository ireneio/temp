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
import { usePageSettingItemsPageFragment as usePageSettingItemsPageFragmentType } from './__generated__/usePageSettingItemsPageFragment';

// definition
export const usePageSettingItemsStoreFragment = gql`
  fragment usePageSettingItemsStoreFragment on Store {
    id
    defaultHomePage {
      id
    }
    defaultProductTemplatePage {
      id
    }
  }
`;

export const usePageSettingItemsPageFragment = gql`
  fragment usePageSettingItemsPageFragment on Page {
    id
    pageType
    isDefaultHomePage @client
    isDefaultProductTemplatePage @client
  }
`;

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
      ),
      delete: useDeletePage(
        id || 'id' /** TODO should not be null */,
        variables,
      ),
    },
  };
};
