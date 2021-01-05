// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useRouter } from '@meepshop/link';

import useCreatePage from './useCreatePage';

// graphql typescript
import { PageTypeEnum } from '../../../../../__generated__/admin';
import { getPagesVariables } from '../../__generated__/getPages';
import { usePagesPageFragment as usePagesPageFragmentType } from '../../hooks/__generated__/usePagesPageFragment';

// definition
export default (
  validateFields: FormComponentProps['form']['validateFields'],
  pageType: usePagesPageFragmentType['pageType'],
  variables: getPagesVariables,
): (() => void) => {
  const createPage = useCreatePage(variables);
  const router = useRouter();

  return useCallback(() => {
    validateFields(
      (err, { title, path, tabTitle, templateType, useBottom }) => {
        if (err) return;

        createPage({
          variables: {
            input: {
              type: (pageType?.toUpperCase() || 'HOME') as PageTypeEnum,
              title,
              path,
              tabTitle,
              templateType,
              useBottom,
            },
          },
        }).then(({ data }) => {
          if (data?.createPage?.status !== 'OK') return;

          router.push(
            `/page-manager/edit/${data?.createPage?.newPage?.node.id}`,
          );
        });
      },
    );
  }, [validateFields, pageType, createPage, router]);
};
