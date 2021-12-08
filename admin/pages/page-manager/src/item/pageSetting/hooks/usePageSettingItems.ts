// typescript import
import { QueryResult } from '@apollo/client';
import IconType from '@ant-design/icons/lib/components/Icon';

import useSelectedPageType from '../../../hooks/useSelectedPage';

// import
import { useMemo } from 'react';
import {
  HomeOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { DefaultLayoutIcon } from '@meepshop/icons';

import useAssignDefaultHomePage from './useAssignDefaultHomePage';
import useAssignDefaultProductTemplatePage from './useAssignDefaultProductTemplatePage';
import useDuplicatePage from './useDuplicatePage';
import useDeletePage from './useDeletePage';

// graphql typescript
import {
  getPages,
  getPagesVariables,
  usePageSettingItemsPageFragment as usePageSettingItemsPageFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
export type eventType = 'home' | 'template' | 'edit' | 'copy' | 'delete';

// definition
export default (
  {
    id,
    pageType,
    isDefaultHomePage,
    isDefaultProductTemplatePage,
  }: usePageSettingItemsPageFragmentType,
  edit: () => void,
  variables: QueryResult<getPages, getPagesVariables>['variables'],
  setSelectedPage: ReturnType<typeof useSelectedPageType>['setSelectedPage'],
): {
  key: string;
  click: () => void;
  Icon: typeof IconType;
}[] => {
  const assignDefaultHomePage = useAssignDefaultHomePage(
    id || 'id' /** SHOULD_NOT_BE_NULL */,
  );
  const assignDefaultProductTemplatePage = useAssignDefaultProductTemplatePage(
    id || 'id' /** SHOULD_NOT_BE_NULL */,
  );
  const duplicatePage = useDuplicatePage(
    id || 'id' /** SHOULD_NOT_BE_NULL */,
    pageType,
    variables,
    setSelectedPage,
  );
  const deletePage = useDeletePage(
    id || 'id' /** SHOULD_NOT_BE_NULL */,
    variables,
  );

  return useMemo(() => {
    const events = [];

    switch (pageType) {
      case 'home':
        events.push(
          'edit',
          isDefaultHomePage ? null : 'home',
          'copy',
          isDefaultHomePage ? null : 'delete',
        );
        break;

      case 'custom':
        events.push('edit', 'copy', 'delete');
        break;

      case 'products':
        events.push('edit');
        break;

      default:
        events.push(
          'edit',
          'copy',
          isDefaultProductTemplatePage ? null : 'template',
        );
        break;
    }

    return events.filter(Boolean).map(
      (event: eventType) =>
        ({
          home: {
            key: 'page-setting.home',
            click: assignDefaultHomePage,
            Icon: HomeOutlined,
          },
          template: {
            key: 'page-setting.template',
            click: assignDefaultProductTemplatePage,
            Icon: DefaultLayoutIcon,
          },
          edit: {
            key: ['home', 'custom', 'products'].includes(
              pageType || '' /** SHOULD_NOT_BE_NULL */,
            )
              ? 'page-setting.seo'
              : 'page-setting.edit',
            click: edit,
            Icon: EditOutlined,
          },
          copy: {
            key: 'page-setting.copy',
            click: duplicatePage,
            Icon: CopyOutlined,
          },
          delete: {
            key: 'page-setting.delete',
            click: deletePage,
            Icon: DeleteOutlined,
          },
        }[event]),
    );
  }, [
    pageType,
    isDefaultHomePage,
    isDefaultProductTemplatePage,
    edit,
    assignDefaultHomePage,
    assignDefaultProductTemplatePage,
    duplicatePage,
    deletePage,
  ]);
};
