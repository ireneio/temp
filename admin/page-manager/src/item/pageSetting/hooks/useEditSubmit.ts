// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import useRenamePageWithSEO from './useRenamePageWithSEO';

// graphql typescript
import { PageTypeEnum } from '../../../../../../__generated__/admin';
import { editFragment as editFragmentType } from '../__generated__/editFragment';
import { useRenamePageWithSEOCacheVariables } from './__generated__/useRenamePageWithSEOCache';

// definition
export default (
  validateFields: FormComponentProps['form']['validateFields'],
  id: string,
  pageType: editFragmentType['pageType'],
  variables: useRenamePageWithSEOCacheVariables,
  onClose: () => void,
): ((e: React.FormEvent<HTMLElement>) => void) => {
  const renamePageWithSEO = useRenamePageWithSEO(pageType, variables);

  return useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      validateFields(
        (err, { title, path, tabTitle, keywords, description, image }) => {
          if (err) return;

          renamePageWithSEO({
            pageId: id,
            title,
            type: (pageType?.toUpperCase() || 'HOME') as PageTypeEnum,
            ...(pageType !== 'custom'
              ? {}
              : {
                  path,
                  tabTitle,
                }),
            ...(!['home', 'custom', 'products'].includes(
              pageType || '' /** SHOULD_NOT_BE_NULL */,
            )
              ? {}
              : {
                  seo: {
                    keywords,
                    description,
                    image,
                  },
                }),
          }).then(() => onClose());
        },
      );
    },
    [validateFields, id, pageType, onClose, renamePageWithSEO],
  );
};
