// import
import { useMemo } from 'react';
import { filter } from 'graphql-anywhere';

// graphql typescript
import {
  getPages,
  getPagesVariables,
  usePagesPageFragment as usePagesPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { usePagesStoreFragment } from '../gqls/usePages';

// definition
export default (
  data: getPages | null,
  variables: getPagesVariables,
): {
  key: string;
  data: {
    key:
      | 'home-page'
      | 'custom-page'
      | 'default-product-list-page'
      | 'template-page';
    hint: boolean;
    data: usePagesPageFragmentType[];
  }[];
}[] =>
  useMemo(() => {
    const store = data?.viewer?.store;

    if (!store) return [];

    const {
      homePages,
      customPages,
      defaultProductListPage,
      productTemplatePage,
    } = filter(usePagesStoreFragment, store);

    return [
      {
        key: 'page',
        data: [
          {
            key: 'home-page',
            hint: false,
            data: homePages.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
          },
          {
            key: 'custom-page',
            hint: false,
            data: customPages.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
          },
        ],
      },
      {
        key: 'product-page',
        data: [
          {
            key: 'default-product-list-page',
            hint: true,
            data:
              !variables.homePagesFilter?.searchTerm ||
              new RegExp(variables.homePagesFilter.searchTerm).test(
                defaultProductListPage.title.zh_TW,
              )
                ? [defaultProductListPage]
                : [],
          },
          {
            key: 'template-page',
            hint: true,
            data: productTemplatePage.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
          },
        ],
      },
    ];
  }, [data, variables]);
